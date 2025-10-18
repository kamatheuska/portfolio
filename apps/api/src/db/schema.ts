import {
    integer,
    pgTable,
    varchar,
    serial,
    text,
    numeric,
    boolean,
    timestamp,
    jsonb,
    pgSchema,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    userId: integer("user_id").primaryKey().generatedAlwaysAsIdentity().notNull(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});

export const products = pgTable("products", {
    productId: serial("product_id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description"),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    sku: varchar("sku", { length: 100 }).unique().notNull(),
    stockQuantity: integer("stock_quantity").default(0).notNull(),
    categoryId: integer("category_id"),
    imageUrl: varchar("image_url", { length: 500 }),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const stripeProductsMetadata = pgTable("stripe_products_metadata", {
    stripeProductsMetadataId: serial("id").primaryKey().notNull(),
    json: jsonb("json").notNull(),
    productId: integer("product_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
    categoryId: serial("category_id").imaryKey().notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).unique().notNull(),
    description: text("description"),
    parentId: integer("parent_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const urlShortenerSchema = pgSchema("url_shortener");

export const urls = pgTable("url", {
    original: text("original").notNull(),
    short: varchar("short").notNull(),
    hex: varchar("hex", { length: 32 }).notNull(),
});
