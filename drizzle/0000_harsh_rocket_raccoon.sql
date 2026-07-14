CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`provider_account_id` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_provider_idx` ON `accounts` (`provider`,`provider_account_id`);--> statement-breakpoint
CREATE INDEX `accounts_user_id_idx` ON `accounts` (`user_id`);--> statement-breakpoint
CREATE TABLE `analytics` (
	`id` text PRIMARY KEY NOT NULL,
	`event` text NOT NULL,
	`entity_type` text,
	`entity_id` text,
	`user_id` text,
	`session_id` text,
	`metadata` text,
	`timestamp` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `analytics_event_idx` ON `analytics` (`event`);--> statement-breakpoint
CREATE INDEX `analytics_entity_idx` ON `analytics` (`entity_type`,`entity_id`);--> statement-breakpoint
CREATE INDEX `analytics_user_idx` ON `analytics` (`user_id`);--> statement-breakpoint
CREATE INDEX `analytics_session_idx` ON `analytics` (`session_id`);--> statement-breakpoint
CREATE INDEX `analytics_timestamp_idx` ON `analytics` (`timestamp`);--> statement-breakpoint
CREATE TABLE `blog_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`author_id` text,
	`featured_image` text,
	`images` text,
	`category` text,
	`tags` text,
	`published_at` integer,
	`updated_at` integer,
	`is_published` integer DEFAULT false,
	`is_featured` integer DEFAULT false,
	`seo_title` text,
	`seo_description` text,
	`reading_time_minutes` integer,
	FOREIGN KEY (`author_id`) REFERENCES `instructors`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_idx` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE INDEX `blog_posts_published_idx` ON `blog_posts` (`is_published`,`published_at`);--> statement-breakpoint
CREATE INDEX `blog_posts_category_idx` ON `blog_posts` (`category`);--> statement-breakpoint
CREATE INDEX `blog_posts_author_idx` ON `blog_posts` (`author_id`);--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`course_id` text NOT NULL,
	`session_id` text,
	`session_date` integer NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`payment_intent_id` text,
	`payment_status` text DEFAULT 'pending',
	`amount_paid_cents` integer DEFAULT 0,
	`currency` text DEFAULT 'GBP',
	`google_event_id` text,
	`whatsapp_sent` integer DEFAULT false,
	`terms_accepted` integer DEFAULT false,
	`terms_version` text,
	`health_screening` text,
	`cancellation_reason` text,
	`cancelled_at` integer,
	`checked_in_at` integer,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`session_id`) REFERENCES `course_sessions`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `bookings_user_idx` ON `bookings` (`user_id`);--> statement-breakpoint
CREATE INDEX `bookings_course_idx` ON `bookings` (`course_id`);--> statement-breakpoint
CREATE INDEX `bookings_session_idx` ON `bookings` (`session_id`);--> statement-breakpoint
CREATE INDEX `bookings_status_idx` ON `bookings` (`status`);--> statement-breakpoint
CREATE INDEX `bookings_session_date_idx` ON `bookings` (`session_date`);--> statement-breakpoint
CREATE UNIQUE INDEX `bookings_payment_intent_idx` ON `bookings` (`payment_intent_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `bookings_user_session_unique` ON `bookings` (`user_id`,`session_id`);--> statement-breakpoint
CREATE TABLE `corporate_enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`company_name` text NOT NULL,
	`contact_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`employee_count` text,
	`requirements` text,
	`preferred_location` text,
	`preferred_time` text,
	`budget` text,
	`status` text DEFAULT 'new',
	`notes` text,
	`assigned_to` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `corporate_enquiries_status_idx` ON `corporate_enquiries` (`status`);--> statement-breakpoint
CREATE INDEX `corporate_enquiries_email_idx` ON `corporate_enquiries` (`email`);--> statement-breakpoint
CREATE TABLE `course_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`course_id` text NOT NULL,
	`session_date` integer NOT NULL,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL,
	`location_id` text,
	`instructor_id` text,
	`capacity` integer NOT NULL,
	`booked_count` integer DEFAULT 0,
	`waitlist_count` integer DEFAULT 0,
	`status` text DEFAULT 'scheduled',
	`notes` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`instructor_id`) REFERENCES `instructors`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `course_sessions_course_date_idx` ON `course_sessions` (`course_id`,`session_date`);--> statement-breakpoint
CREATE INDEX `course_sessions_date_idx` ON `course_sessions` (`session_date`);--> statement-breakpoint
CREATE INDEX `course_sessions_status_idx` ON `course_sessions` (`status`);--> statement-breakpoint
CREATE TABLE `courses` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`short_description` text NOT NULL,
	`long_description` text,
	`type` text DEFAULT 'offline' NOT NULL,
	`level` text DEFAULT 'all' NOT NULL,
	`location_id` text,
	`instructor_id` text,
	`schedule` text NOT NULL,
	`price_cents` integer NOT NULL,
	`currency` text DEFAULT 'GBP' NOT NULL,
	`capacity` integer DEFAULT 20,
	`duration_minutes` integer DEFAULT 60,
	`image` text,
	`gallery` text,
	`tags` text,
	`requirements` text,
	`what_to_bring` text,
	`benefits` text,
	`is_active` integer DEFAULT true,
	`is_featured` integer DEFAULT false,
	`seo_title` text,
	`seo_description` text,
	`stripe_price_id` text,
	`stripe_product_id` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`instructor_id`) REFERENCES `instructors`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `courses_slug_unique` ON `courses` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `courses_slug_idx` ON `courses` (`slug`);--> statement-breakpoint
CREATE INDEX `courses_active_idx` ON `courses` (`is_active`);--> statement-breakpoint
CREATE INDEX `courses_featured_idx` ON `courses` (`is_featured`);--> statement-breakpoint
CREATE INDEX `courses_type_idx` ON `courses` (`type`);--> statement-breakpoint
CREATE INDEX `courses_location_idx` ON `courses` (`location_id`);--> statement-breakpoint
CREATE INDEX `courses_instructor_idx` ON `courses` (`instructor_id`);--> statement-breakpoint
CREATE TABLE `instructors` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`short_bio` text,
	`long_bio` text,
	`image` text,
	`specialties` text,
	`certifications` text,
	`social_links` text,
	`years_experience` integer DEFAULT 0,
	`order` integer DEFAULT 0,
	`is_active` integer DEFAULT true,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `instructors_slug_unique` ON `instructors` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `instructors_slug_idx` ON `instructors` (`slug`);--> statement-breakpoint
CREATE INDEX `instructors_active_idx` ON `instructors` (`is_active`);--> statement-breakpoint
CREATE TABLE `locations` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`address` text NOT NULL,
	`postcode` text NOT NULL,
	`city` text DEFAULT 'Leicester',
	`country` text DEFAULT 'GB',
	`latitude` real,
	`longitude` real,
	`description` text,
	`image` text,
	`amenities` text,
	`parking_info` text,
	`accessibility_info` text,
	`is_active` integer DEFAULT true,
	`order` integer DEFAULT 0,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `locations_slug_unique` ON `locations` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `locations_slug_idx` ON `locations` (`slug`);--> statement-breakpoint
CREATE INDEX `locations_active_idx` ON `locations` (`is_active`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`session_token` text NOT NULL,
	`user_id` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_session_token_unique` ON `sessions` (`session_token`);--> statement-breakpoint
CREATE INDEX `sessions_user_id_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer,
	`name` text,
	`phone` text,
	`image` text,
	`password_hash` text,
	`role` text DEFAULT 'student' NOT NULL,
	`google_calendar_connected` integer DEFAULT false,
	`google_tokens` text,
	`whatsapp_opt_in` integer DEFAULT false,
	`whatsapp_number` text,
	`preferences` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `users_role_idx` ON `users` (`role`);--> statement-breakpoint
CREATE TABLE `verification_tokens` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `verification_tokens_token_unique` ON `verification_tokens` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `verification_tokens_token_idx` ON `verification_tokens` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `verification_tokens_identifier_token_idx` ON `verification_tokens` (`identifier`,`token`);--> statement-breakpoint
CREATE TABLE `waitlist` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`session_id` text NOT NULL,
	`position` integer NOT NULL,
	`notified_at` integer,
	`expires_at` integer,
	`status` text DEFAULT 'waiting',
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`session_id`) REFERENCES `course_sessions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_user_session_unique` ON `waitlist` (`user_id`,`session_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_session_position_unique` ON `waitlist` (`session_id`,`position`);--> statement-breakpoint
CREATE INDEX `waitlist_status_idx` ON `waitlist` (`status`);