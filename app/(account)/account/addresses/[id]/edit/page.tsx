import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUser } from "@/lib/dal";
import { getAddress } from "@/lib/db/queries/addresses";
import { AddressForm } from "@/components/account/address-form";

export const metadata: Metadata = { title: "Edit Address — HK Gems" };

export default async function EditAddressPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUser();
  if (!user) return null;

  const address = await getAddress(id, user.id);
  if (!address) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-normal text-ink sm:text-3xl">Edit Address</h1>
      <div className="mt-6">
        <AddressForm address={address} />
      </div>
    </div>
  );
}
