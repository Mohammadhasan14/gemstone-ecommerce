import Link from "next/link";

const shopLinks = [
  { href: "/gemstones?category=firoza", label: "Firoza (Turquoise)" },
  { href: "/gemstones?category=aqiq", label: "Aqiq (Agate)" },
  { href: "/gemstones?category=pukhraj", label: "Pukhraj (Yellow Sapphire)" },
  { href: "/gemstones", label: "All Gemstones" },
];

const companyLinks = [
  { href: "/#certification", label: "About Us" },
  { href: "/#certification", label: "Certifications" },
  { href: "/#guide", label: "Gemstone Guide" },
  { href: "/#faq", label: "Contact" },
];

const supportLinks = [
  { href: "/#faq", label: "Shipping & Delivery" },
  { href: "/#faq", label: "Returns & Refunds" },
  { href: "/#faq", label: "Expert Consultation" },
  { href: "/#faq", label: "Track Order" },
];

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="mb-3.5 text-[11px] font-bold tracking-[.14em] text-gold uppercase sm:mb-[18px] sm:text-[11.5px] sm:tracking-[.18em]">
        {title}
      </div>
      <div className="flex flex-col gap-2.5 sm:gap-3">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-[13px] text-ivory/65 transition-colors hover:text-gold sm:text-[13.5px]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink pt-14 pb-8 sm:pt-16 sm:pb-9 lg:pt-20 lg:pb-10">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="font-serif text-xl tracking-[.06em] text-ivory sm:text-2xl">
              HK <span className="text-gold">GEMS</span>
            </div>
            <p className="mt-4 max-w-[300px] text-[13px] leading-[1.7] text-ivory/55 sm:mt-[18px] sm:text-[13.5px] sm:leading-[1.75]">
              Certified natural gemstones, sourced from their finest origins
              and documented by independent laboratories.
            </p>
            <div className="mt-5 flex gap-2.5 sm:mt-6">
              {["IGI", "GIA", "GJEPC"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-ivory/18 px-3 py-1.5 text-[10.5px] font-semibold tracking-[.08em] text-ivory/65 sm:px-3.5 sm:text-[11px] sm:tracking-[.1em]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <FooterColumn title="Shop" links={shopLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Support" links={supportLinks} />
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-ivory/10 pt-6 text-center sm:mt-12 sm:flex-row sm:justify-between sm:gap-5 sm:pt-7 sm:text-left lg:mt-15">
          <span className="text-[12px] text-ivory/40 sm:text-[12.5px]">© 2026 HK Gems. All rights reserved.</span>
          <span className="text-[12px] text-ivory/40 sm:text-[12.5px]">
            Secure payments · UPI · Cards · Net Banking
          </span>
        </div>
      </div>
    </footer>
  );
}
