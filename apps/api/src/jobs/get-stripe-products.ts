import { drizzle } from "drizzle-orm/postgres-js";
import Stripe from "stripe";
import { products, stripeProductsMetadata } from "../db/schema.js";
const stripeApiKey = process.env.STRIPE_API_KEY ?? "";
const dbUrl = process.env.DATABASE_URL ?? "";

if (!stripeApiKey) {
  throw new Error("Missing STRIPE_API_KEY env var");
}

if (!dbUrl) {
  throw new Error("Missing DATABASE_URL env var");
}

async function main() {
  const stripe = new Stripe(stripeApiKey, {
    apiVersion: "2025-09-30.clover",
  });

  const response = await stripe.products.list({
    limit: 100,
  });

  console.log("Products:", response.data);

  const db = drizzle(dbUrl);

  for (const product of response.data) {
    const price = await stripe.prices.retrieve(product.default_price as string);

    console.log("Price for product", product.name, "is", price.unit_amount);
    await db.transaction(async (tx) => {
      console.log("Inserting product:", product.name);
      const parsedPrice =
        String(((price.unit_amount ?? 0) / 100).toFixed(2)) ?? "0.00";
      console.log("Parsed price:", parsedPrice);

      const productInserted = await tx
        .insert(products)
        .values({
          name: product.name,
          price: parsedPrice,
          description: product.description ?? "",
          slug: product.name.toLowerCase().replace(/\s+/g, "-"),
          sku: product.default_price as string,
          categoryId: null,
          imageUrl:
            product.images && product.images.length > 0
              ? product.images[0]
              : null,
          isActive: product.active,
        })
        .onConflictDoNothing()
        .returning();

      if (productInserted.length === 0) {
        console.log(
          `Product with name ${product.name} already exists, skipping metadata insertion.`
        );
        return;
      }

      await tx
        .insert(stripeProductsMetadata)
        .values({
          json: product as unknown as object,
          productId: productInserted[0].productId,
        })
        .onConflictDoNothing()
        .returning();
    });
  }

  db.$client.end();
  console.info("Done inserting products");
}

void main();
