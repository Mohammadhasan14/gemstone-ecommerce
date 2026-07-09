import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingChatButton } from "@/components/floating-chat-button";
import { PageTransition } from "@/components/page-transition";
import { getUser } from "@/lib/dal";

export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <>
      <SiteHeader user={user ? { name: user.name } : null} />
      <PageTransition>
        {children}
        <SiteFooter />
      </PageTransition>
      <FloatingChatButton />
    </>
  );
}
