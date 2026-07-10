import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingChatButton } from "@/components/floating-chat-button";
import { PageTransition } from "@/components/page-transition";
import { getUser } from "@/lib/dal";
import { getCurrentCartReadOnly } from "@/lib/cart";
import { getCartWithItems } from "@/lib/db/queries/cart";

export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  const cart = await getCurrentCartReadOnly();
  const cartItems = cart ? await getCartWithItems(cart.id) : [];

  return (
    <>
      <SiteHeader user={user ? { name: user.name } : null} cartItems={cartItems} />
      <PageTransition>
        {children}
        <SiteFooter />
      </PageTransition>
      <FloatingChatButton />
    </>
  );
}
