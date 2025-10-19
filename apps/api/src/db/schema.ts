import { varchar, text, pgSchema } from "drizzle-orm/pg-core";

export const urlShortenerSchema = pgSchema("url_shortener");

export const urls = urlShortenerSchema.table("url", {
    original: text("original").notNull(),
    short: varchar("short").notNull(),
    hex: varchar("hex", { length: 32 }).notNull(),
});
