CREATE TABLE `timer_profiles` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `timer` (
	`id` text PRIMARY KEY,
	`label` text DEFAULT '' NOT NULL,
	`profile_id` text NOT NULL
);
