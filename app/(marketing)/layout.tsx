import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingChatButton } from "@/components/floating-chat-button";
import { PageTransition } from "@/components/page-transition";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <PageTransition>
        {children}
        <SiteFooter />
      </PageTransition>
      <FloatingChatButton />
    </>
  );
}
