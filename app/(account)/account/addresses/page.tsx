import type { Metadata } from "next";
import Link from "next/link";
import { getUser } from "@/lib/dal";
import { listAddresses } from "@/lib/db/queries/addresses";
import { AddressCard } from "@/components/account/address-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Addresses — HK Gems" };

export default async function AddressesPage() {
  const user = await getUser();
  if (!user) return null;

  const addresses = await listAddresses(user.id);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-normal text-ink sm:text-3xl">Address Book</h1>
          <p className="mt-2 text-sm text-muted">Manage your shipping and billing addresses.</p>
        </div>
        <Link href="/account/addresses/new">
          <Button>Add Address</Button>
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {addresses.length === 0 ? (
          <p className="rounded-2xl border border-ink/7 bg-white px-6 py-10 text-center text-sm text-muted">
            No addresses saved yet.
          </p>
        ) : (
          addresses.map((address) => <AddressCard key={address.id} address={address} />)
        )}
      </div>
    </div>
  );
}
