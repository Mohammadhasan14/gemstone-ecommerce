import { trustItems } from "@/lib/data";

function TrustRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex flex-none gap-16 pr-16" aria-hidden={ariaHidden || undefined}>
      {trustItems.map((item, i) => (
        <div key={i} className="flex flex-none items-center gap-3">
          <span className="block h-2 w-2 flex-none rotate-45 bg-gold" />
          <span className="whitespace-nowrap text-[13.5px] font-semibold tracking-[.02em] text-charcoal">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function TrustMarquee() {
  return (
    <section className="relative overflow-hidden border-b border-ink/7 bg-white">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-12 bg-gradient-to-r from-white to-transparent sm:w-20 lg:w-30" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-12 bg-gradient-to-l from-white to-transparent sm:w-20 lg:w-30" />
      <div className="animate-hk-marquee flex w-max py-5 sm:py-[26px]">
        <TrustRow />
        <TrustRow ariaHidden />
      </div>
    </section>
  );
}
