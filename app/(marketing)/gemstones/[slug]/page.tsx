import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import { ProductGallery } from "@/components/catalog/product-gallery";
import { CertificationBadge } from "@/components/catalog/certification-badge";
import { AddToCartForm } from "@/components/catalog/add-to-cart-form";
import { getProductBySlug } from "@/lib/db/queries/products";
import { formatPriceMinor, formatPricePerCarat } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} — HK Gems`,
    description: product.description ?? `${product.kind} · ${product.originName ?? ""}`.trim(),
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const price = formatPriceMinor(product.priceMinor, product.currency);
  const perCt = formatPricePerCarat(product.priceMinor, product.currency, product.caratWeight);

  return (
    <main className="pt-[max(7rem,calc(var(--header-h-max,118px)+20px))] pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <nav className="mb-6 flex items-center gap-1.5 text-[12.5px] text-muted sm:mb-8">
          <Link href="/gemstones" className="hover:text-teal">Gemstones</Link>
          <ChevronRight size={13} />
          <span className="text-ink">{product.name}</span>
        </nav>

        <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} fallbackHint={product.kind} />

          <div className="flex flex-col gap-5">
            <div>
              <div className="text-[11px] font-bold tracking-[.14em] text-teal uppercase sm:text-[12.5px]">
                {product.kind}
              </div>
              <h1 className="mt-2 font-serif text-3xl font-normal text-ink sm:text-4xl">{product.name}</h1>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13.5px] text-muted">
              {product.grade && <span>{product.grade}</span>}
              {product.caratWeight && <span>{product.caratWeight} ct</span>}
              {product.originName && <span>Origin: {product.originName}</span>}
              {product.treatment && <span>{product.treatment}</span>}
            </div>

            <div className="border-t border-ink/8 pt-5">
              <div className="text-2xl font-bold text-ink sm:text-[28px]">{price}</div>
              {perCt && <div className="mt-0.5 text-[13px] text-muted">{perCt}</div>}
            </div>

            {product.description && (
              <p className="text-[14.5px] leading-[1.7] text-muted">{product.description}</p>
            )}

            <CertificationBadge certifications={product.certifications} />

            <div className="mt-2">
              <AddToCartForm
                productId={product.id}
                productName={product.name}
                price={price}
                disabled={product.status !== "active"}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
