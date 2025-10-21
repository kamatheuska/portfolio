CREATE SCHEMA "meta_auth";
--> statement-breakpoint
CREATE TABLE "meta_auth"."sessions" (
	"token" varchar(256) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "meta_auth"."users" (
	"user_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"username" varchar(32) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "username_unique_idx" UNIQUE("username"),
	CONSTRAINT "username_length_check" CHECK (length(username) >= 3),
	CONSTRAINT "username_format_check" CHECK (username ~ '^[a-zA-Z0-9_-]+$'),
	CONSTRAINT "password_length_check" CHECK (length(password) >= 8)
);
--> statement-breakpoint
CREATE INDEX "username_idx" ON "meta_auth"."users" USING btree ("username");