import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/db/queries/products";
import { formatPriceMinor } from "@/lib/format";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const results = await searchProducts(query, 8);

  return NextResponse.json({
    results: results.map((p) => ({
      slug: p.slug,
      name: p.name,
      kind: p.kind,
      price: formatPriceMinor(p.priceMinor, p.currency),
    })),
  });
}
