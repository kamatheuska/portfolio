-- migrate:up
ALTER TABLE "meta_auth"."sessions" ADD COLUMN "token_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL;--> statement-breakpoint
ALTER TABLE "meta_auth"."sessions" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
CREATE INDEX "token_idx" ON "meta_auth"."sessions" USING btree ("token");--> statement-breakpoint
ALTER TABLE "meta_auth"."sessions" ADD CONSTRAINT "token_id_unique_idx" UNIQUE("token_id");--> statement-breakpoint
ALTER TABLE "meta_auth"."sessions" ADD CONSTRAINT "token_unique_idx" UNIQUE("token");

-- migrate:down
ALTER TABLE "meta_auth"."sessions" DROP COLUMN "token_id";
ALTER TABLE "meta_auth"."sessions" DROP COLUMN "user_id";
-- ALTER TABLE "meta_auth"."sessions" DROP CONSTRAINT "token_idx";
-- ALTER TABLE "meta_auth"."sessions" DROP CONSTRAINT "token_id_unique_idx";
ALTER TABLE "meta_auth"."sessions" DROP CONSTRAINT "token_unique_idx";
