const shopLinks = [
  { href: "#stones", label: "Firoza (Turquoise)" },
  { href: "#stones", label: "Aqiq (Agate)" },
  { href: "#stones", label: "Pukhraj (Yellow Sapphire)" },
  { href: "#stones", label: "All Gemstones" },
];

const companyLinks = [
  { href: "#certification", label: "About Us" },
  { href: "#certification", label: "Certifications" },
  { href: "#guide", label: "Gemstone Guide" },
  { href: "#faq", label: "Contact" },
];

const supportLinks = [
  { href: "#faq", label: "Shipping & Delivery" },
  { href: "#faq", label: "Returns & Refunds" },
  { href: "#faq", label: "Expert Consultation" },
  { href: "#faq", label: "Track Order" },
];

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="mb-[18px] text-[11.5px] font-bold tracking-[.18em] text-gold uppercase">
        {title}
      </div>
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[13.5px] text-ivory/65 transition-colors hover:text-gold"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink pt-20 pb-10">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="font-serif text-2xl tracking-[.06em] text-ivory">
              HK <span className="text-gold">GEMS</span>
            </div>
            <p className="mt-[18px] max-w-[300px] text-[13.5px] leading-[1.75] text-ivory/55">
              Certified natural gemstones, sourced from their finest origins
              and documented by independent laboratories.
            </p>
            <div className="mt-6 flex gap-2.5">
              {["IGI", "GIA", "GJEPC"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-ivory/18 px-3.5 py-1.5 text-[11px] font-semibold tracking-[.1em] text-ivory/65"
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

        <div className="mt-15 flex flex-wrap items-center justify-between gap-5 border-t border-ivory/10 pt-7">
          <span className="text-[12.5px] text-ivory/40">© 2026 HK Gems. All rights reserved.</span>
          <span className="text-[12.5px] text-ivory/40">
            Secure payments · UPI · Cards · Net Banking
          </span>
        </div>
      </div>
    </footer>
  );
}
