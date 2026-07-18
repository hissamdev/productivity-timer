PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_timer_profiles` (
	`id` text PRIMARY KEY,
	`name` text DEFAULT 'New Profile' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_timer_profiles`(`id`, `name`) SELECT `id`, `name` FROM `timer_profiles`;--> statement-breakpoint
DROP TABLE `timer_profiles`;--> statement-breakpoint
ALTER TABLE `__new_timer_profiles` RENAME TO `timer_profiles`;--> statement-breakpoint
PRAGMA foreign_keys=ON;