import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { schema } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  console.log(`Received Stripe event: ${event.type}`);

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSuccess(paymentIntent);
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailure(paymentIntent);
        break;
      }
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription, event.type);
        break;
      }
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata.bookingId;
  if (!bookingId) return;

  await db.update(schema.bookings)
    .set({
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentIntentId: paymentIntent.id,
      amountPaidCents: paymentIntent.amount_received,
      updatedAt: new Date(),
    })
    .where(eq(schema.bookings.id, bookingId));

  // Trigger async actions (Calendar, WhatsApp, Email)
  await triggerPostBookingActions(bookingId);
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata.bookingId;
  if (!bookingId) return;

  await db.update(schema.bookings)
    .set({
      status: 'cancelled',
      paymentStatus: 'failed',
      updatedAt: new Date(),
    })
    .where(eq(schema.bookings.id, bookingId));
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  // Handled by payment_intent.succeeded for one-time payments
  // Handle subscription creation here if needed
  if (session.mode === 'subscription' && session.subscription) {
    console.log('Subscription checkout completed:', session.subscription);
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription, eventType: string) {
  // Handle subscription lifecycle events
  console.log(`Subscription ${eventType}:`, subscription.id);
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  // Handle recurring subscription payments
  console.log('Invoice payment succeeded:', invoice.id);
}

async function triggerPostBookingActions(bookingId: string) {
  // In production, these would go to a queue (Cloudflare Queues)
  // For now, we'll trigger them directly but they should be async
  
  try {
    const booking = await db.query.bookings.findFirst({
      where: eq(schema.bookings.id, bookingId),
      with: {
        user: true,
        course: { with: { location: true, instructor: true } },
        session: true,
      },
    });

    if (!booking) return;

    // TODO: Trigger Google Calendar event creation
    // await createGoogleCalendarEvent(booking.userId, booking.course, booking.sessionDate);

    // TODO: Send WhatsApp confirmation
    // await sendWhatsAppConfirmation(booking);

    // TODO: Send email receipt
    // await sendBookingReceiptEmail(booking);

    console.log(`Post-booking actions triggered for booking ${bookingId}`);
  } catch (error) {
    console.error('Error triggering post-booking actions:', error);
  }
}