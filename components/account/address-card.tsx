"use client";

import Link from "next/link";
import { useTransition } from "react";
import { removeAddress } from "@/actions/account";

type Address = {
  id: string;
  label: string | null;
  fullName: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  type: "shipping" | "billing";
  isDefault: boolean;
};

export function AddressCard({ address }: { address: Address }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-2xl border border-ink/7 bg-white px-5 py-4.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {address.label && <span className="font-semibold text-ink">{address.label}</span>}
          <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-muted uppercase">
            {address.type}
          </span>
          {address.isDefault && (
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-gold uppercase">
              Default
            </span>
          )}
        </div>
        <div className="flex shrink-0 gap-3 text-[12.5px] font-semibold">
          <Link href={`/account/addresses/${address.id}/edit`} className="text-teal hover:underline">
            Edit
          </Link>
          <button
            type="button"
            disabled={isPending}
            onClick={() => startTransition(() => removeAddress(address.id))}
            className="text-[#B4304A] hover:underline disabled:opacity-50"
          >
            {isPending ? "Removing…" : "Remove"}
          </button>
        </div>
      </div>
      <div className="mt-2.5 text-[13.5px] leading-[1.6] text-muted">
        {address.fullName} · {address.phone}
        <br />
        {address.line1}
        {address.line2 ? `, ${address.line2}` : ""}
        <br />
        {address.city}, {address.state} {address.postalCode}, {address.country}
      </div>
    </div>
  );
}
