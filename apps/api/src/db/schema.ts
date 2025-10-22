import { sql } from "drizzle-orm";
import { varchar, text, pgSchema, uuid, timestamp, unique, check, index } from "drizzle-orm/pg-core";

export const urlShortenerSchema = pgSchema("url_shortener");
export const metaAuthSchema = pgSchema("meta_auth");

export const urls = urlShortenerSchema.table("url", {
    original: text("original").notNull(),
    short: varchar("short").notNull(),
    hex: varchar("hex", { length: 32 }).notNull(),
});

export const metaUsers = metaAuthSchema.table(
    "users",
    {
        userId: uuid("user_id")
            .default(sql`uuid_generate_v4()`)
            .primaryKey()
            .notNull(),
        username: varchar("username", { length: 32 }).unique().notNull(),
        password: varchar("password", { length: 255 }) // Increased for hashed passwords
            .notNull(),
        createdAt: timestamp("created_at", { withTimezone: true })
            .default(sql`now()`)
            .notNull(),
        updatedAt: timestamp("updated_at", { withTimezone: true })
            .default(sql`now()`)
            .notNull(),
    },
    table => [
        unique("username_unique_idx").on(table.username),

        check("username_length_check", sql`length(username) >= 3`),
        check(
            "username_format_check",
            sql`username ~ '^[a-zA-Z0-9_-]+$'`, // Only alphanumeric, underscore, hyphen
        ),
        check("password_length_check", sql`length(password) >= 8`),

        index("username_idx").on(table.username),
    ],
);
export const metaSessions = metaAuthSchema.table("sessions", {
    tokenId: uuid("token_id")
        .default(sql`uuid_generate_v4()`)
        .primaryKey()
        .notNull(),
    token: varchar("token", { length: 256 }).notNull(),
    userId: uuid("user_id")
        .notNull(),
    createdAt: timestamp().default(sql`now()`),
    updatedAt: timestamp().default(sql`now()`),
},
    table => [
        unique("token_id_unique_idx").on(table.tokenId),
        unique("token_unique_idx").on(table.token),

        index("token_idx").on(table.token),
    ],

);
