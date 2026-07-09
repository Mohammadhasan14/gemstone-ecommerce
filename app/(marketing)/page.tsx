import { HeroSection } from "@/components/marketing/hero-section";
import { TrustMarquee } from "@/components/marketing/trust-marquee";
import { FeaturedGemstones } from "@/components/marketing/featured-gemstones";
import { ShopByStone } from "@/components/marketing/shop-by-stone";
import { ShopByPurpose } from "@/components/marketing/shop-by-purpose";
import { CertificationSection } from "@/components/marketing/certification-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { GuideSection } from "@/components/marketing/guide-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { NewsletterSection } from "@/components/marketing/newsletter-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustMarquee />
      <FeaturedGemstones />
      <ShopByStone />
      <ShopByPurpose />
      <CertificationSection />
      <TestimonialsSection />
      <GuideSection />
      <FaqSection />
      <NewsletterSection />
    </main>
  );
}
