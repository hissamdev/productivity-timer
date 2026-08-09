CREATE TABLE `properties` (
	`id` text PRIMARY KEY,
	`label` text,
	`type` text NOT NULL,
	`color` text DEFAULT '#3B82F6' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `property_data` (
	`id` text PRIMARY KEY,
	`property_id` text NOT NULL,
	`triggered_at` integer NOT NULL,
	`manual_time` integer
);
--> statement-breakpoint
CREATE TABLE `timestamp_data` (
	`id` text PRIMARY KEY,
	`timer_id` text NOT NULL,
	`timestamp` integer NOT NULL,
	`note` text DEFAULT '' NOT NULL
);
