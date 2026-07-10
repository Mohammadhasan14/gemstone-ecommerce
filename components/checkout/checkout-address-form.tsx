"use client";

import { useActionState } from "react";
import { placeOrder } from "@/actions/checkout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field-error";

type Prefill = { email?: string; fullName?: string; phone?: string; line1?: string; line2?: string; city?: string; state?: string; postalCode?: string; country?: string };

export function CheckoutAddressForm({ prefill }: { prefill?: Prefill }) {
  const [state, action, pending] = useActionState(placeOrder, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" defaultValue={prefill?.email} required />
        <FieldError messages={state?.errors?.email} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" name="fullName" defaultValue={prefill?.fullName} required />
          <FieldError messages={state?.errors?.fullName} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" defaultValue={prefill?.phone} required />
          <FieldError messages={state?.errors?.phone} />
        </div>
      </div>

      <div>
        <Label htmlFor="line1">Address line 1</Label>
        <Input id="line1" name="line1" defaultValue={prefill?.line1} required />
        <FieldError messages={state?.errors?.line1} />
      </div>

      <div>
        <Label htmlFor="line2">Address line 2 (optional)</Label>
        <Input id="line2" name="line2" defaultValue={prefill?.line2} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={prefill?.city} required />
          <FieldError messages={state?.errors?.city} />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" name="state" defaultValue={prefill?.state} required />
          <FieldError messages={state?.errors?.state} />
        </div>
        <div>
          <Label htmlFor="postalCode">Postal code</Label>
          <Input id="postalCode" name="postalCode" defaultValue={prefill?.postalCode} required />
          <FieldError messages={state?.errors?.postalCode} />
        </div>
      </div>

      <div>
        <Label htmlFor="country">Country</Label>
        <Input id="country" name="country" defaultValue={prefill?.country ?? "India"} required />
        <FieldError messages={state?.errors?.country} />
      </div>

      <div>
        <Label htmlFor="discountCode">Discount code (optional)</Label>
        <Input id="discountCode" name="discountCode" placeholder="e.g. WELCOME10" className="uppercase placeholder:normal-case" />
      </div>

      {state?.message && <p className="text-[13px] text-[#B4304A]">{state.message}</p>}

      <Button type="submit" disabled={pending} className="mt-2 w-full">
        {pending ? "Placing order…" : "Continue to Payment"}
      </Button>
    </form>
  );
}
