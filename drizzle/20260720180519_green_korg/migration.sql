PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_timer_data` (
	`id` text PRIMARY KEY,
	`timer_id` text NOT NULL,
	`data_type` text NOT NULL,
	`timestamp` integer NOT NULL,
	`elapsed_total` integer NOT NULL,
	`paused_total` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_timer_data`(`id`, `timer_id`, `data_type`, `timestamp`, `elapsed_total`, `paused_total`) SELECT `id`, `timer_id`, `data_type`, `timestamp`, `elapsed_total`, `paused_total` FROM `timer_data`;--> statement-breakpoint
DROP TABLE `timer_data`;--> statement-breakpoint
ALTER TABLE `__new_timer_data` RENAME TO `timer_data`;--> statement-breakpoint
PRAGMA foreign_keys=ON;