import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { TrustMarquee } from "@/components/trust-marquee";
import { FeaturedGemstones } from "@/components/featured-gemstones";
import { ShopByStone } from "@/components/shop-by-stone";
import { ShopByPurpose } from "@/components/shop-by-purpose";
import { CertificationSection } from "@/components/certification-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { GuideSection } from "@/components/guide-section";
import { FaqSection } from "@/components/faq-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { SiteFooter } from "@/components/site-footer";
import { FloatingChatButton } from "@/components/floating-chat-button";
import { PageTransition } from "@/components/page-transition";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <PageTransition>
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
        <SiteFooter />
      </PageTransition>
      <FloatingChatButton />
    </>
  );
}
