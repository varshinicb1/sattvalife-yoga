import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}
export const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
  maxNetworkRetries: 3,
});

export const getStripeSession = async (params: {
  courseId: string;
  sessionId: string;
  userId: string;
  userEmail: string;
  amount: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) => {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: params.currency.toLowerCase(),
          product_data: {
            name: `Course Booking`,
            metadata: {
              courseId: params.courseId,
              sessionId: params.sessionId,
            },
          },
          unit_amount: params.amount,
        },
        quantity: 1,
      },
    ],
    customer_email: params.userEmail,
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: {
      userId: params.userId,
      courseId: params.courseId,
      sessionId: params.sessionId,
      ...params.metadata,
    },
    payment_intent_data: {
      metadata: {
        userId: params.userId,
        courseId: params.courseId,
        sessionId: params.sessionId,
      },
    },
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['GB'],
    },
    phone_number_collection: {
      enabled: true,
    },
  });

  return session;
};

export const createPaymentIntent = async (params: {
  amount: number;
  currency: string;
  userId: string;
  courseId: string;
  sessionId: string;
  metadata?: Record<string, string>;
}) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: params.amount,
    currency: params.currency.toLowerCase(),
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      userId: params.userId,
      courseId: params.courseId,
      sessionId: params.sessionId,
      ...params.metadata,
    },
  });

  return paymentIntent;
};

export const confirmPaymentIntent = async (paymentIntentId: string, paymentMethodId: string) => {
  return stripe.paymentIntents.confirm(paymentIntentId, {
    payment_method: paymentMethodId,
  });
};

export const refundPayment = async (paymentIntentId: string, amount?: number, reason?: Stripe.RefundCreateParams.Reason) => {
  return stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount,
    reason,
  });
};

export const createCustomer = async (email: string, name?: string, metadata?: Record<string, string>) => {
  return stripe.customers.create({
    email,
    name,
    metadata,
  });
};

export const attachPaymentMethod = async (paymentMethodId: string, customerId: string) => {
  return stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerId,
  });
};

export const detachPaymentMethod = async (paymentMethodId: string) => {
  return stripe.paymentMethods.detach(paymentMethodId);
};

export const listPaymentMethods = async (customerId: string, type: 'card' = 'card') => {
  return stripe.paymentMethods.list({
    customer: customerId,
    type,
  });
};

export const createSetupIntent = async (customerId: string) => {
  return stripe.setupIntents.create({
    customer: customerId,
    payment_method_types: ['card'],
  });
};

export const getStripeCustomer = async (customerId: string) => {
  return stripe.customers.retrieve(customerId);
};

export const updateStripeCustomer = async (customerId: string, params: Stripe.CustomerUpdateParams) => {
  return stripe.customers.update(customerId, params);
};

export const constructWebhookEvent = (payload: string | Buffer, signature: string, secret: string) => {
  return stripe.webhooks.constructEvent(payload, signature, secret);
};

export const getProduct = async (productId: string) => {
  return stripe.products.retrieve(productId);
};

export const createProduct = async (params: Stripe.ProductCreateParams) => {
  return stripe.products.create(params);
};

export const updateProduct = async (productId: string, params: Stripe.ProductUpdateParams) => {
  return stripe.products.update(productId, params);
};

export const createPrice = async (params: Stripe.PriceCreateParams) => {
  return stripe.prices.create(params);
};

export const getPrice = async (priceId: string) => {
  return stripe.prices.retrieve(priceId);
};