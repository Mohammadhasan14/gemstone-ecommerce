import Link from "next/link";
import { LogoutButton } from "./logout-button";

const links = [
  { href: "/account", label: "Dashboard" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/wishlist", label: "Wishlist" },
];

export function AccountNav({ userName }: { userName: string }) {
  return (
    <aside className="flex flex-col gap-5">
      <div>
        <div className="text-[11px] font-bold tracking-[.14em] text-gold uppercase">My Account</div>
        <div className="mt-1 font-serif text-lg text-ink">{userName}</div>
      </div>
      <nav className="flex flex-col gap-1 border-t border-ink/8 pt-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg px-3 py-2 text-[13.5px] font-semibold text-ink transition-colors hover:bg-ink/5 hover:text-teal"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-ink/8 pt-4">
        <LogoutButton />
      </div>
    </aside>
  );
}
