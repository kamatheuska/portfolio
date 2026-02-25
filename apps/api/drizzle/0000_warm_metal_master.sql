CREATE TABLE `sessions` (
	`token_id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`token` text(256) NOT NULL,
	`user_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`updated_at` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE UNIQUE INDEX `token_id_unique_idx` ON `sessions` (`token_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `token_unique_idx` ON `sessions` (`token`);--> statement-breakpoint
CREATE INDEX `token_idx` ON `sessions` (`token`);--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` text PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))) NOT NULL,
	`username` text(32) NOT NULL,
	`password` text(255) NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `username_unique_idx` ON `users` (`username`);--> statement-breakpoint
CREATE INDEX `username_idx` ON `users` (`username`);--> statement-breakpoint
CREATE TABLE `url` (
	`original` text NOT NULL,
	`short` text NOT NULL,
	`hex` text(32) NOT NULL
);
