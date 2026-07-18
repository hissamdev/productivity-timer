CREATE TABLE `timer_data` (
	`id` text PRIMARY KEY,
	`timer_id` text NOT NULL,
	`data_type` text NOT NULL,
	`timestamp` integer
);
--> statement-breakpoint
ALTER TABLE `timer` ADD `running` integer DEFAULT false NOT NULL;