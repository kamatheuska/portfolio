import { sql } from "drizzle-orm";
import { sqliteTable, integer, text, index } from "drizzle-orm/sqlite-core";

export const homeLinks = sqliteTable(
    "home_links",
    {
        id: integer("id").primaryKey(),
        icon: text("icon").notNull(),
        ariaLabel: text("aria_label").notNull(),
        href: text("href").notNull(),
        updatedAt: text("updated_at")
            .notNull()
            .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
        createdAt: text("created_at")
            .notNull()
            .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
    },
    columns => [
        index("home_links_updated_at_idx").on(columns.updatedAt),
        index("home_links_created_at_idx").on(columns.createdAt),
    ],
);
