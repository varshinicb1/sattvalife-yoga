import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { schema } from '@/lib/db/schema';
import { eq, and, desc, gte, lte, count } from 'drizzle-orm';
import { z } from 'zod';
import { getStripeSession } from '@/lib/stripe';

const bookingQuerySchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed', 'waitlisted', 'no_show']).optional(),
  userId: z.string().optional(),
  courseId: z.string().optional(),
  sessionId: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(20),
});

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const params = bookingQuerySchema.parse(Object.fromEntries(searchParams));

    const isAdmin = (session.user as any).role === 'admin';
    const userId = isAdmin ? params.userId : session.user.id;

    const conditions = [];
    if (userId) conditions.push(eq(schema.bookings.userId, userId));
    if (params.status) conditions.push(eq(schema.bookings.status, params.status));
    if (params.courseId) conditions.push(eq(schema.bookings.courseId, params.courseId));
    if (params.sessionId) conditions.push(eq(schema.bookings.sessionId, params.sessionId));
    if (params.dateFrom) conditions.push(gte(schema.bookings.sessionDate, new Date(params.dateFrom)));
    if (params.dateTo) conditions.push(lte(schema.bookings.sessionDate, new Date(params.dateTo)));

    const offset = (params.page - 1) * params.limit;

    const [bookings, totalResult] = await Promise.all([
      db.query.bookings.findMany({
        where: and(...conditions),
        with: {
          user: { columns: { id: true, name: true, email: true, phone: true } },
          course: true,
          session: true,
        },
        orderBy: desc(schema.bookings.createdAt),
        limit: params.limit,
        offset,
      }),
      db.select({ count: count() }).from(schema.bookings).where(and(...conditions)),
    ]);

    const total = totalResult[0]?.count ?? 0;

    return NextResponse.json({
      bookings,
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages: Math.ceil(total / params.limit),
      },
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

const createBookingSchema = z.object({
  courseId: z.string(),
  sessionId: z.string().optional(),
  sessionDate: z.string(),
  termsAccepted: z.boolean().refine(v => v === true, 'Terms must be accepted'),
  termsVersion: z.string(),
  healthScreening: z.object({
    registeringFor: z.enum(['self', 'someone_else']),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    dateOfBirth: z.string(),
    occupation: z.string(),
    address: z.string(),
    city: z.string(),
    postcode: z.string(),
    mobile: z.string(),
    emergencyContact: z.string(),
    email: z.string().email(),
    hasPracticedYoga: z.boolean(),
    yogaExperienceYears: z.number().int().min(1).max(50).optional(),
    limitations: z.array(z.string()),
    pastSurgeries: z.string(),
    additionalNotes: z.string(),
    waiverAccepted: z.boolean().refine(v => v === true),
    waiverAcceptedAt: z.number(),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = createBookingSchema.parse(body);

    const course = await db.query.courses.findFirst({
      where: eq(schema.courses.id, data.courseId),
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    let sessionRecord;
    if (data.sessionId) {
      sessionRecord = await db.query.courseSessions.findFirst({
        where: eq(schema.courseSessions.id, data.sessionId),
      });
    }

    const existingBookings = await db.select({ count: count() }).from(schema.bookings).where(
      and(
        eq(schema.bookings.sessionId, data.sessionId || ''),
        eq(schema.bookings.status, 'confirmed')
      )
    );

    const capacity = sessionRecord?.capacity ?? course.capacity ?? 20;
    if ((existingBookings[0]?.count ?? 0) >= capacity) {
      return NextResponse.json({ error: 'Class is full' }, { status: 400 });
    }

    const bookingId = crypto.randomUUID();

    await db.insert(schema.bookings).values({
      id: bookingId,
      userId: session.user!.id,
      courseId: data.courseId,
      sessionId: data.sessionId,
      sessionDate: new Date(data.sessionDate),
      status: 'pending',
      termsAccepted: true,
      termsVersion: data.termsVersion,
      healthScreening: data.healthScreening as any,
    } as any);

    const stripeSession = await getStripeSession({
      courseId: course.id,
      sessionId: data.sessionId || 'temp',
      userId: session.user!.id as string,
      userEmail: session.user.email!,
      amount: course.priceCents,
      currency: course.currency,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/booking/success?booking_id=${bookingId}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/schedule`,
      metadata: {
        bookingId,
        courseId: course.id,
        sessionId: data.sessionId || 'temp',
      },
    });

    if (stripeSession.payment_intent) {
      const paymentIntentId = typeof stripeSession.payment_intent === 'string'
        ? stripeSession.payment_intent
        : stripeSession.payment_intent.id;
      await db.update(schema.bookings)
        .set({ paymentIntentId })
        .where(eq(schema.bookings.id, bookingId));
    }

    return NextResponse.json({
      bookingId,
      url: stripeSession.url,
      amount: course.priceCents,
      currency: course.currency,
    });
  } catch (error) {
    console.error('Create booking error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
