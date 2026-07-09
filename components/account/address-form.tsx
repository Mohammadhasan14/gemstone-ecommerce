"use client";

import { useActionState } from "react";
import { upsertAddress } from "@/actions/account";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field-error";

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

export function AddressForm({ address }: { address?: Address }) {
  const action = upsertAddress.bind(null, address?.id ?? null);
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-[560px]">
      <div>
        <Label htmlFor="label">Label (optional)</Label>
        <Input id="label" name="label" placeholder="Home, Office…" defaultValue={address?.label ?? ""} />
        <FieldError messages={state?.errors?.label} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" name="fullName" defaultValue={address?.fullName} required />
          <FieldError messages={state?.errors?.fullName} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" defaultValue={address?.phone} required />
          <FieldError messages={state?.errors?.phone} />
        </div>
      </div>

      <div>
        <Label htmlFor="line1">Address line 1</Label>
        <Input id="line1" name="line1" defaultValue={address?.line1} required />
        <FieldError messages={state?.errors?.line1} />
      </div>

      <div>
        <Label htmlFor="line2">Address line 2 (optional)</Label>
        <Input id="line2" name="line2" defaultValue={address?.line2 ?? ""} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={address?.city} required />
          <FieldError messages={state?.errors?.city} />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" name="state" defaultValue={address?.state} required />
          <FieldError messages={state?.errors?.state} />
        </div>
        <div>
          <Label htmlFor="postalCode">Postal code</Label>
          <Input id="postalCode" name="postalCode" defaultValue={address?.postalCode} required />
          <FieldError messages={state?.errors?.postalCode} />
        </div>
      </div>

      <div>
        <Label htmlFor="country">Country</Label>
        <Input id="country" name="country" defaultValue={address?.country ?? "India"} required />
        <FieldError messages={state?.errors?.country} />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="type-billing"
          name="type"
          type="checkbox"
          value="billing"
          defaultChecked={address?.type === "billing"}
          className="h-4 w-4 rounded border-ink/20"
        />
        <Label htmlFor="type-billing" className="mb-0 normal-case">
          This is a billing address (unchecked = shipping)
        </Label>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isDefault"
          name="isDefault"
          type="checkbox"
          defaultChecked={address?.isDefault}
          className="h-4 w-4 rounded border-ink/20"
        />
        <Label htmlFor="isDefault" className="mb-0 normal-case">
          Set as default
        </Label>
      </div>

      {state?.message && <p className="text-[13px] text-[#B4304A]">{state.message}</p>}

      <Button type="submit" disabled={pending} className="mt-2 self-start">
        {pending ? "Saving…" : address ? "Save Address" : "Add Address"}
      </Button>
    </form>
  );
}
