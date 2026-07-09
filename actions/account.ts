"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { AddressSchema, ProfileSchema } from "@/lib/validation/account";
import * as addressQueries from "@/lib/db/queries/addresses";
import * as userQueries from "@/lib/db/queries/users";

export type AddressFormState =
  | {
      errors?: Partial<Record<keyof import("zod").infer<typeof AddressSchema>, string[]>>;
      message?: string;
    }
  | undefined;

export type ProfileFormState = { errors?: { name?: string[]; phone?: string[] }; message?: string } | undefined;

function readAddressForm(formData: FormData) {
  return {
    label: String(formData.get("label") ?? ""),
    fullName: String(formData.get("fullName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    line1: String(formData.get("line1") ?? ""),
    line2: String(formData.get("line2") ?? ""),
    city: String(formData.get("city") ?? ""),
    state: String(formData.get("state") ?? ""),
    postalCode: String(formData.get("postalCode") ?? ""),
    country: String(formData.get("country") ?? "India"),
    type: (formData.get("type") === "billing" ? "billing" : "shipping") as "shipping" | "billing",
    isDefault: formData.get("isDefault") === "on",
  };
}

export async function upsertAddress(
  addressId: string | null,
  _state: AddressFormState,
  formData: FormData
): Promise<AddressFormState> {
  const session = await verifySession();
  if (!session) redirect("/login");

  const validated = AddressSchema.safeParse(readAddressForm(formData));
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const data = { ...validated.data, label: validated.data.label || undefined, line2: validated.data.line2 || undefined };

  if (addressId) {
    await addressQueries.updateAddress(addressId, session.userId, data);
  } else {
    await addressQueries.createAddress(session.userId, data);
  }

  revalidatePath("/account/addresses");
  redirect("/account/addresses");
}

export async function removeAddress(addressId: string) {
  const session = await verifySession();
  if (!session) redirect("/login");

  await addressQueries.deleteAddress(addressId, session.userId);
  revalidatePath("/account/addresses");
}

export async function updateProfile(_state: ProfileFormState, formData: FormData): Promise<ProfileFormState> {
  const session = await verifySession();
  if (!session) redirect("/login");

  const validated = ProfileSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  await userQueries.updateProfile(session.userId, {
    name: validated.data.name,
    phone: validated.data.phone || undefined,
  });

  revalidatePath("/account");
  return { message: "Profile updated." };
}
