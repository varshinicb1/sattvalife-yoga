export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: {
    content: string;
    format: 'mdx' | 'html';
  };
  type: 'offline' | 'online' | 'hybrid';
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  locationId?: string;
  instructorId?: string;
  schedule: ScheduleRule[];
  priceCents: number;
  currency: string;
  capacity: number;
  durationMinutes: number;
  image?: string;
  gallery?: string[];
  tags?: string[];
  requirements?: string;
  whatToBring?: string;
  benefits?: string[];
  isActive: boolean;
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  stripePriceId?: string;
  stripeProductId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScheduleRule {
  frequency: 'weekly' | 'biweekly' | 'monthly';
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  startDate: string;
  endDate?: string;
  exceptions?: string[];
  timezone: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  image?: string;
  amenities?: string[];
  parkingInfo?: string;
  accessibilityInfo?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Instructor {
  id: string;
  userId?: string;
  name: string;
  slug: string;
  title: string;
  shortBio?: string;
  longBio?: {
    content: string;
    format: 'mdx' | 'html';
  };
  image?: string;
  specialties?: string[];
  certifications?: Array<{
    name: string;
    year: number;
    issuer: string;
  }>;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  yearsExperience: number;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  courseId: string;
  sessionId?: string;
  sessionDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'waitlisted' | 'no_show';
  paymentIntentId?: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
  amountPaidCents: number;
  currency: string;
  googleEventId?: string;
  whatsappSent: boolean;
  termsAccepted: boolean;
  termsVersion?: string;
  healthScreening?: HealthScreeningData;
  cancellationReason?: string;
  cancelledAt?: Date;
  checkedInAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface HealthScreeningData {
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
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: {
    content: string;
    format: 'mdx' | 'html';
  };
  authorId?: string;
  featuredImage?: string;
  images?: BlogImage[];
  category?: string;
  tags?: string[];
  publishedAt?: Date;
  updatedAt: Date;
  isPublished: boolean;
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  readingTimeMinutes?: number;
}

export interface BlogImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface CorporateEnquiry {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  employeeCount?: string;
  requirements?: string;
  preferredLocation?: string;
  preferredTime?: string;
  budget?: string;
  status: 'new' | 'contacted' | 'proposal_sent' | 'negotiating' | 'won' | 'lost';
  notes?: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalyticsEvent {
  id: string;
  event: string;
  entityType?: string;
  entityId?: string;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  image?: string;
  phone?: string;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type CourseType = 'offline' | 'online' | 'hybrid';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'waitlisted' | 'no_show';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
export type UserRole = 'student' | 'instructor' | 'admin';
export type EnquiryStatus = 'new' | 'contacted' | 'proposal_sent' | 'negotiating' | 'won' | 'lost';