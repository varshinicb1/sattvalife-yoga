import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { schema } from '@/lib/db/schema';
import { eq, and, desc, gte, lte, like, count, or } from 'drizzle-orm';
import { z } from 'zod';

const courseQuerySchema = z.object({
  type: z.enum(['offline', 'online', 'hybrid']).optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'all']).optional(),
  locationId: z.string().optional(),
  instructorId: z.string().optional(),
  isActive: z.coerce.boolean().default(true),
  search: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = courseQuerySchema.parse(Object.fromEntries(searchParams));

    const conditions = [eq(schema.courses.isActive, params.isActive)];
    if (params.type) conditions.push(eq(schema.courses.type, params.type));
    if (params.level) conditions.push(eq(schema.courses.level, params.level));
    if (params.locationId) conditions.push(eq(schema.courses.locationId, params.locationId));
    if (params.instructorId) conditions.push(eq(schema.courses.instructorId, params.instructorId));
    if (params.search) {
      const orCondition = or(
        like(schema.courses.title, `%${params.search}%`),
        like(schema.courses.shortDescription, `%${params.search}%`),
      );
      if (orCondition) conditions.push(orCondition);
    }

    const offset = (params.page - 1) * params.limit;
    const where = and(...conditions);

    const [courses, totalResult] = await Promise.all([
      db.query.courses.findMany({
        where,
        with: { location: true, instructor: true },
        orderBy: desc(schema.courses.isFeatured),
        limit: params.limit,
        offset,
      }),
      db.select({ count: count() }).from(schema.courses).where(where),
    ]);

    const total = totalResult[0]?.count ?? 0;

    const coursesWithAvailability = await Promise.all(
      courses.map(async (course) => {
        const sessionCount = await db.select({ count: count() }).from(schema.courseSessions)
          .where(and(
            eq(schema.courseSessions.courseId, course.id),
            gte(schema.courseSessions.sessionDate, new Date()),
            eq(schema.courseSessions.status, 'scheduled')
          ));
        return { ...course, upcomingSessions: sessionCount[0]?.count ?? 0 };
      })
    );

    return NextResponse.json({
      courses: coursesWithAvailability,
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages: Math.ceil(total / params.limit),
      },
    });
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

const createCourseSchema = z.object({
  slug: z.string().min(1).max(100),
  title: z.string().min(1).max(200),
  shortDescription: z.string().min(1).max(500),
  type: z.enum(['offline', 'online', 'hybrid']).default('offline'),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'all']).default('all'),
  locationId: z.string().optional(),
  instructorId: z.string().optional(),
  schedule: z.array(z.object({
    frequency: z.enum(['weekly', 'biweekly', 'monthly']),
    daysOfWeek: z.array(z.number().min(0).max(6)),
    startTime: z.string(),
    endTime: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    timezone: z.string().default('Europe/London'),
  })).min(1),
  priceCents: z.number().int().positive(),
  capacity: z.number().int().positive().default(20),
  durationMinutes: z.number().int().positive().default(60),
  isFeatured: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = createCourseSchema.parse(body);

    const courseId = crypto.randomUUID();
    await db.insert(schema.courses).values({
      id: courseId,
      ...data,
      longDescription: { content: '', format: 'html' },
      currency: 'GBP',
    });

    for (const rule of data.schedule) {
      const sessions = generateSessionsFromRule(rule, courseId);
      for (const session of sessions) {
        await db.insert(schema.courseSessions).values(session);
      }
    }

    return NextResponse.json({ id: courseId }, { status: 201 });
  } catch (error) {
    console.error('Create course error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}

function generateSessionsFromRule(rule: z.infer<typeof createCourseSchema>['schedule'][0], courseId: string) {
  const sessions = [];
  const startDate = new Date(rule.startDate);
  const endDate = rule.endDate ? new Date(rule.endDate) : new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    if (rule.daysOfWeek.includes(currentDate.getDay())) {
      const start = new Date(currentDate);
      const [startHour, startMin] = rule.startTime.split(':').map(Number);
      start.setHours(startHour, startMin, 0, 0);

      const end = new Date(currentDate);
      const [endHour, endMin] = rule.endTime.split(':').map(Number);
      end.setHours(endHour, endMin, 0, 0);

      sessions.push({
        id: crypto.randomUUID(),
        courseId,
        sessionDate: start,
        startTime: rule.startTime,
        endTime: rule.endTime,
        capacity: 20,
        status: 'scheduled' as const,
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return sessions;
}
