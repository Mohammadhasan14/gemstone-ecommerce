export function formatPriceMinor(priceMinor: number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(priceMinor / 100);
}

export function formatPricePerCarat(priceMinor: number, currency: string, caratWeight: string | null) {
  const carat = caratWeight ? Number(caratWeight) : 0;
  if (!carat) return null;
  return `${formatPriceMinor(Math.round(priceMinor / carat), currency)} / ct`;
}
