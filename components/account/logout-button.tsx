"use client";

import { logout } from "@/actions/auth";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="text-[13.5px] font-semibold text-muted transition-colors hover:text-[#B4304A]">
        Log Out
      </button>
    </form>
  );
}
