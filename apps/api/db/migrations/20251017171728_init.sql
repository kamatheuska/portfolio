-- migrate:up

-- Create users table
CREATE TABLE users (
  user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

-- Create categories table
CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  parent_id INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (parent_id) REFERENCES categories(category_id) ON DELETE SET NULL
);

-- Create products table
CREATE TABLE products (
  product_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  category_id INTEGER,
  image_url VARCHAR(500),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
);

-- Create stripe_products_metadata table
CREATE TABLE stripe_products_metadata (
  id SERIAL PRIMARY KEY NOT NULL,
  json JSONB NOT NULL,
  product_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_stripe_products_metadata_product_id ON stripe_products_metadata(product_id);

-- migrate:down

DROP TABLE IF EXISTS stripe_products_metadata;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
