import {
  sqliteTable,
  text,
  integer,
  real,
  index,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  email: text('email').unique().notNull(),
  emailVerified: integer('email_verified', { mode: 'timestamp' }),
  name: text('name'),
  phone: text('phone'),
  image: text('image'),
  passwordHash: text('password_hash'),
  role: text('role', { enum: ['student', 'instructor', 'admin'] }).default('student').notNull(),
  googleCalendarConnected: integer('google_calendar_connected', { mode: 'boolean' }).default(false),
  googleTokens: text('google_tokens', { mode: 'json' }),
  whatsappOptIn: integer('whatsapp_opt_in', { mode: 'boolean' }).default(false),
  whatsappNumber: text('whatsapp_number'),
  preferences: text('preferences', { mode: 'json' }).$type<UserPreferences>(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
}, (table) => ({
  emailIdx: uniqueIndex('users_email_idx').on(table.email),
  roleIdx: index('users_role_idx').on(table.role),
}));

export type UserPreferences = {
  notifications: {
    email: boolean;
    whatsapp: boolean;
    push: boolean;
    reminders24h: boolean;
    reminders1h: boolean;
    marketing: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: string;
};

export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
}, (table) => ({
  providerIdx: uniqueIndex('accounts_provider_idx').on(table.provider, table.providerAccountId),
  userIdIdx: index('accounts_user_id_idx').on(table.userId),
}));

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  sessionToken: text('session_token').unique().notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  userIdIdx: index('sessions_user_id_idx').on(table.userId),
}));

export const verificationTokens = sqliteTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').unique().notNull(),
  expires: integer('expires', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  tokenIdx: uniqueIndex('verification_tokens_token_idx').on(table.token),
  identifierTokenIdx: uniqueIndex('verification_tokens_identifier_token_idx').on(table.identifier, table.token),
}));

export const locations = sqliteTable('locations', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  address: text('address').notNull(),
  postcode: text('postcode').notNull(),
  city: text('city').default('Leicester'),
  country: text('country').default('GB'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  description: text('description'),
  image: text('image'),
  amenities: text('amenities', { mode: 'json' }).$type<string[]>(),
  parkingInfo: text('parking_info'),
  accessibilityInfo: text('accessibility_info'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  order: integer('order').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
}, (table) => ({
  slugIdx: uniqueIndex('locations_slug_idx').on(table.slug),
  activeIdx: index('locations_active_idx').on(table.isActive),
}));

export const instructors = sqliteTable('instructors', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  shortBio: text('short_bio'),
  longBio: text('long_bio', { mode: 'json' }).$type<{ content: string; format: 'mdx' | 'html' }>(),
  image: text('image'),
  specialties: text('specialties', { mode: 'json' }).$type<string[]>(),
  certifications: text('certifications', { mode: 'json' }).$type<{ name: string; year: number; issuer: string }[]>(),
  socialLinks: text('social_links', { mode: 'json' }).$type<{ platform: string; url: string }[]>(),
  yearsExperience: integer('years_experience').default(0),
  order: integer('order').default(0),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
}, (table) => ({
  slugIdx: uniqueIndex('instructors_slug_idx').on(table.slug),
  activeIdx: index('instructors_active_idx').on(table.isActive),
}));

export const courses = sqliteTable('courses', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  shortDescription: text('short_description').notNull(),
  longDescription: text('long_description', { mode: 'json' }).$type<{ content: string; format: 'mdx' | 'html' }>(),
  type: text('type', { enum: ['offline', 'online', 'hybrid'] }).default('offline').notNull(),
  level: text('level', { enum: ['beginner', 'intermediate', 'advanced', 'all'] }).default('all').notNull(),
  locationId: text('location_id').references(() => locations.id, { onDelete: 'set null' }),
  instructorId: text('instructor_id').references(() => instructors.id, { onDelete: 'set null' }),
  schedule: text('schedule', { mode: 'json' }).$type<ScheduleRule[]>().notNull(),
  priceCents: integer('price_cents').notNull(),
  currency: text('currency').default('GBP').notNull(),
  capacity: integer('capacity').default(20),
  durationMinutes: integer('duration_minutes').default(60),
  image: text('image'),
  gallery: text('gallery', { mode: 'json' }).$type<string[]>(),
  tags: text('tags', { mode: 'json' }).$type<string[]>(),
  requirements: text('requirements'),
  whatToBring: text('what_to_bring'),
  benefits: text('benefits', { mode: 'json' }).$type<string[]>(),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  stripePriceId: text('stripe_price_id'),
  stripeProductId: text('stripe_product_id'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
}, (table) => ({
  slugIdx: uniqueIndex('courses_slug_idx').on(table.slug),
  activeIdx: index('courses_active_idx').on(table.isActive),
  featuredIdx: index('courses_featured_idx').on(table.isFeatured),
  typeIdx: index('courses_type_idx').on(table.type),
  locationIdx: index('courses_location_idx').on(table.locationId),
  instructorIdx: index('courses_instructor_idx').on(table.instructorId),
}));

export type ScheduleRule = {
  frequency: 'weekly' | 'biweekly' | 'monthly';
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  startDate: string;
  endDate?: string;
  exceptions?: string[];
  timezone: string;
};

export const courseSessions = sqliteTable('course_sessions', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  courseId: text('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  sessionDate: integer('session_date', { mode: 'timestamp' }).notNull(),
  startTime: text('start_time').notNull(),
  endTime: text('end_time').notNull(),
  locationId: text('location_id').references(() => locations.id, { onDelete: 'set null' }),
  instructorId: text('instructor_id').references(() => instructors.id, { onDelete: 'set null' }),
  capacity: integer('capacity').notNull(),
  bookedCount: integer('booked_count').default(0),
  waitlistCount: integer('waitlist_count').default(0),
  status: text('status', { enum: ['scheduled', 'cancelled', 'completed', 'in_progress'] }).default('scheduled'),
  notes: text('notes'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
}, (table) => ({
  courseDateIdx: index('course_sessions_course_date_idx').on(table.courseId, table.sessionDate),
  dateIdx: index('course_sessions_date_idx').on(table.sessionDate),
  statusIdx: index('course_sessions_status_idx').on(table.status),
}));

export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: text('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  sessionId: text('session_id').references(() => courseSessions.id, { onDelete: 'set null' }),
  sessionDate: integer('session_date', { mode: 'timestamp' }).notNull(),
  status: text('status', { enum: ['pending', 'confirmed', 'cancelled', 'completed', 'waitlisted', 'no_show'] }).default('pending').notNull(),
  paymentIntentId: text('payment_intent_id'),
  paymentStatus: text('payment_status', { enum: ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'] }).default('pending'),
  amountPaidCents: integer('amount_paid_cents').default(0),
  currency: text('currency').default('GBP'),
  googleEventId: text('google_event_id'),
  whatsappSent: integer('whatsapp_sent', { mode: 'boolean' }).default(false),
  termsAccepted: integer('terms_accepted', { mode: 'boolean' }).default(false),
  termsVersion: text('terms_version'),
  healthScreening: text('health_screening', { mode: 'json' }).$type<HealthScreeningData>(),
  cancellationReason: text('cancellation_reason'),
  cancelledAt: integer('cancelled_at', { mode: 'timestamp' }),
  checkedInAt: integer('checked_in_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
}, (table) => ({
  userIdx: index('bookings_user_idx').on(table.userId),
  courseIdx: index('bookings_course_idx').on(table.courseId),
  sessionIdx: index('bookings_session_idx').on(table.sessionId),
  statusIdx: index('bookings_status_idx').on(table.status),
  sessionDateIdx: index('bookings_session_date_idx').on(table.sessionDate),
  paymentIntentIdx: uniqueIndex('bookings_payment_intent_idx').on(table.paymentIntentId),
  userSessionUnique: uniqueIndex('bookings_user_session_unique').on(table.userId, table.sessionId),
}));

export type HealthScreeningData = {
  registeringFor: 'self' | 'someone_else';
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  occupation: string;
  address: string;
  city: string;
  postcode: string;
  mobile: string;
  emergencyContact: string;
  email: string;
  hasPracticedYoga: boolean;
  yogaExperienceYears?: number;
  limitations: string[];
  pastSurgeries: string;
  additionalNotes: string;
  waiverAccepted: boolean;
  waiverAcceptedAt: number;
};

export const blogPosts = sqliteTable('blog_posts', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content', { mode: 'json' }).$type<{ content: string; format: 'mdx' | 'html' }>().notNull(),
  authorId: text('author_id').references(() => instructors.id, { onDelete: 'set null' }),
  featuredImage: text('featured_image'),
  images: text('images', { mode: 'json' }).$type<BlogImage[]>(),
  category: text('category'),
  tags: text('tags', { mode: 'json' }).$type<string[]>(),
  publishedAt: integer('published_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
  isPublished: integer('is_published', { mode: 'boolean' }).default(false),
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  readingTimeMinutes: integer('reading_time_minutes'),
}, (table) => ({
  slugIdx: uniqueIndex('blog_posts_slug_idx').on(table.slug),
  publishedIdx: index('blog_posts_published_idx').on(table.isPublished, table.publishedAt),
  categoryIdx: index('blog_posts_category_idx').on(table.category),
  authorIdx: index('blog_posts_author_idx').on(table.authorId),
}));

export type BlogImage = {
  url: string;
  alt: string;
  caption?: string;
};

export const analytics = sqliteTable('analytics', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  event: text('event').notNull(),
  entityType: text('entity_type'),
  entityId: text('entity_id'),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  sessionId: text('session_id'),
  metadata: text('metadata', { mode: 'json' }),
  timestamp: integer('timestamp', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => ({
  eventIdx: index('analytics_event_idx').on(table.event),
  entityIdx: index('analytics_entity_idx').on(table.entityType, table.entityId),
  userIdx: index('analytics_user_idx').on(table.userId),
  sessionIdx: index('analytics_session_idx').on(table.sessionId),
  timestampIdx: index('analytics_timestamp_idx').on(table.timestamp),
}));

export const waitlist = sqliteTable('waitlist', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  sessionId: text('session_id').notNull().references(() => courseSessions.id, { onDelete: 'cascade' }),
  position: integer('position').notNull(),
  notifiedAt: integer('notified_at', { mode: 'timestamp' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
  status: text('status', { enum: ['waiting', 'notified', 'expired', 'booked', 'cancelled'] }).default('waiting'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
}, (table) => ({
  userSessionUnique: uniqueIndex('waitlist_user_session_unique').on(table.userId, table.sessionId),
  sessionPositionIdx: uniqueIndex('waitlist_session_position_unique').on(table.sessionId, table.position),
  statusIdx: index('waitlist_status_idx').on(table.status),
}));

export const corporateEnquiries = sqliteTable('corporate_enquiries', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  companyName: text('company_name').notNull(),
  contactName: text('contact_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  employeeCount: text('employee_count'),
  requirements: text('requirements'),
  preferredLocation: text('preferred_location'),
  preferredTime: text('preferred_time'),
  budget: text('budget'),
  status: text('status', { enum: ['new', 'contacted', 'proposal_sent', 'negotiating', 'won', 'lost'] }).default('new'),
  notes: text('notes'),
  assignedTo: text('assigned_to').references(() => users.id, { onDelete: 'set null' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
}, (table) => ({
  statusIdx: index('corporate_enquiries_status_idx').on(table.status),
  emailIdx: index('corporate_enquiries_email_idx').on(table.email),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  bookings: many(bookings),
  waitlist: many(waitlist),
  analytics: many(analytics),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const locationsRelations = relations(locations, ({ many }) => ({
  courses: many(courses),
  sessions: many(courseSessions),
}));

export const instructorsRelations = relations(instructors, ({ one, many }) => ({
  user: one(users, { fields: [instructors.userId], references: [users.id] }),
  courses: many(courses),
  sessions: many(courseSessions),
  blogPosts: many(blogPosts),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  location: one(locations, { fields: [courses.locationId], references: [locations.id] }),
  instructor: one(instructors, { fields: [courses.instructorId], references: [instructors.id] }),
  sessions: many(courseSessions),
  bookings: many(bookings),
}));

export const courseSessionsRelations = relations(courseSessions, ({ one, many }) => ({
  course: one(courses, { fields: [courseSessions.courseId], references: [courses.id] }),
  location: one(locations, { fields: [courseSessions.locationId], references: [locations.id] }),
  instructor: one(instructors, { fields: [courseSessions.instructorId], references: [instructors.id] }),
  bookings: many(bookings),
  waitlist: many(waitlist),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, { fields: [bookings.userId], references: [users.id] }),
  course: one(courses, { fields: [bookings.courseId], references: [courses.id] }),
  session: one(courseSessions, { fields: [bookings.sessionId], references: [courseSessions.id] }),
}));

export const waitlistRelations = relations(waitlist, ({ one }) => ({
  user: one(users, { fields: [waitlist.userId], references: [users.id] }),
  session: one(courseSessions, { fields: [waitlist.sessionId], references: [courseSessions.id] }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(instructors, { fields: [blogPosts.authorId], references: [instructors.id] }),
}));

export const analyticsRelations = relations(analytics, ({ one }) => ({
  user: one(users, { fields: [analytics.userId], references: [users.id] }),
}));

export const corporateEnquiriesRelations = relations(corporateEnquiries, ({ one }) => ({
  assignedUser: one(users, { fields: [corporateEnquiries.assignedTo], references: [users.id] }),
}));

export const schema = {
  users,
  accounts,
  sessions,
  verificationTokens,
  locations,
  instructors,
  courses,
  courseSessions,
  bookings,
  waitlist,
  blogPosts,
  analytics,
  corporateEnquiries,
};

export const authSchema = {
  usersTable: users,
  accountsTable: accounts,
  sessionsTable: sessions,
  verificationTokensTable: verificationTokens,
};