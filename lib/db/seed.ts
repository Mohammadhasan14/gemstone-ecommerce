import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import {
  categories as categoryData,
  products as productData,
  testimonials as testimonialData,
  guides as guideData,
} from "@/lib/data";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const connectionString = process.env.DIRECT_URL;
  if (!connectionString) throw new Error("DIRECT_URL is not set");

  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client, { schema });

  console.log("Seeding categories...");
  const categoryRows = await db
    .insert(schema.categories)
    .values(
      categoryData.map((c) => ({
        slug: slugify(c.slot.replace(/^cat-/, "")),
        name: c.name,
        localName: c.local,
        description: c.note,
      }))
    )
    .returning();

  const categoryByName = new Map(categoryRows.map((c) => [c.name, c]));

  console.log("Seeding origins...");
  const originNames = [...new Set(productData.map((p) => p.origin))];
  const originRows = await db
    .insert(schema.origins)
    .values(originNames.map((name) => ({ name, country: name })))
    .returning();
  const originByName = new Map(originRows.map((o) => [o.name, o]));

  console.log("Seeding products...");
  for (const p of productData) {
    const [category] = p.kind.split(" · ").slice(-1);
    const priceMinor = Math.round(
      Number(p.price.replace(/[^0-9.]/g, "")) * 100
    );

    await db.insert(schema.products).values({
      slug: slugify(p.slot.replace(/^prod-/, "")),
      sku: p.slot,
      categoryId: categoryByName.get(category)?.id,
      originId: originByName.get(p.origin)?.id,
      name: p.name,
      kind: p.kind,
      grade: p.grade,
      caratWeight: p.carat.replace(/[^0-9.]/g, ""),
      priceMinor,
      currency: "INR",
      status: "active",
      isUnique: true,
      quantity: 1,
    });
  }

  console.log("Seeding testimonials...");
  await db.insert(schema.testimonials).values(
    testimonialData.map((t) => ({
      name: t.name,
      initials: t.initials,
      meta: t.meta,
      quote: t.quote,
      published: true,
    }))
  );

  console.log("Seeding guides...");
  await db.insert(schema.guides).values(
    guideData.map((g) => ({
      slug: g.slot.replace(/^guide-/, ""),
      tag: g.tag,
      title: g.title,
      coverImageHint: g.imgHint,
      readMinutes: Number(g.read.replace(/[^0-9]/g, "")),
      publishedAt: new Date(),
    }))
  );

  console.log("Done.");
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
