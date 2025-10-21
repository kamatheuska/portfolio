-- migrate:up
CREATE SCHEMA "url_shortener";
CREATE TABLE "url_shortener"."url" (
	"original" text NOT NULL,
	"short" varchar NOT NULL,
	"hex" varchar(32) NOT NULL
);


-- migrate:down
DROP SCHEMA "url_shortener";
DROP TABLE "url_shortener";
