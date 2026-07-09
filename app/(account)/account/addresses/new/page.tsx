import type { Metadata } from "next";
import { AddressForm } from "@/components/account/address-form";

export const metadata: Metadata = { title: "Add Address — HK Gems" };

export default function NewAddressPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-normal text-ink sm:text-3xl">Add Address</h1>
      <div className="mt-6">
        <AddressForm />
      </div>
    </div>
  );
}
