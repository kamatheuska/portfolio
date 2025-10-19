CREATE SCHEMA "url_shortener";
--> statement-breakpoint
CREATE TABLE "url_shortener"."url" (
	"original" text NOT NULL,
	"short" varchar NOT NULL,
	"hex" varchar(32) NOT NULL
);
