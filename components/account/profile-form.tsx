"use client";

import { useActionState } from "react";
import { updateProfile } from "@/actions/account";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field-error";

export function ProfileForm({ name, phone, email }: { name: string; phone: string | null; email: string }) {
  const [state, action, pending] = useActionState(updateProfile, undefined);

  return (
    <form action={action} className="flex flex-col gap-4 max-w-[440px]">
      <div>
        <Label htmlFor="name">Full name</Label>
        <Input id="name" name="name" defaultValue={name} required />
        <FieldError messages={state?.errors?.name} />
      </div>

      <div>
        <Label>Email</Label>
        <Input value={email} disabled />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" defaultValue={phone ?? ""} />
        <FieldError messages={state?.errors?.phone} />
      </div>

      {state?.message && <p className="text-[13px] text-teal">{state.message}</p>}

      <Button type="submit" disabled={pending} className="mt-2 self-start">
        {pending ? "Saving…" : "Save Changes"}
      </Button>
    </form>
  );
}
