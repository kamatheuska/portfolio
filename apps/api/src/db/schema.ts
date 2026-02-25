import { sql } from "drizzle-orm";
import { text, sqliteTable, integer, uniqueIndex, index } from "drizzle-orm/sqlite-core";

export const urls = sqliteTable("url", {
    original: text("original").notNull(),
    short: text("short").notNull(),
    hex: text("hex", { length: 32 }).notNull(),
});

export const metaUsers = sqliteTable(
    "users",
    {
        userId: text("user_id")
            .default(sql`(lower(hex(randomblob(16))))`)
            .primaryKey()
            .notNull(),
        username: text("username", { length: 32 }).notNull(),
        password: text("password", { length: 255 }).notNull(),
        createdAt: integer("created_at", { mode: "timestamp" })
            .default(sql`(unixepoch())`)
            .notNull(),
        updatedAt: integer("updated_at", { mode: "timestamp" })
            .default(sql`(unixepoch())`)
            .notNull(),
    },
    table => [
        uniqueIndex("username_unique_idx").on(table.username),
        index("username_idx").on(table.username),
    ],
);

export const metaSessions = sqliteTable(
    "sessions",
    {
        tokenId: text("token_id")
            .default(sql`(lower(hex(randomblob(16))))`)
            .primaryKey()
            .notNull(),
        token: text("token", { length: 256 }).notNull(),
        userId: text("user_id").notNull(),
        createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
        updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
    },
    table => [
        uniqueIndex("token_id_unique_idx").on(table.tokenId),
        uniqueIndex("token_unique_idx").on(table.token),
        index("token_idx").on(table.token),
    ],
);
