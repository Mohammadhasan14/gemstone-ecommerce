import * as z from "zod";

export const AddressSchema = z.object({
  label: z.string().trim().max(60).optional().or(z.literal("")),
  fullName: z.string().trim().min(2, { error: "Enter the recipient's full name." }),
  phone: z.string().trim().min(6, { error: "Enter a valid phone number." }),
  line1: z.string().trim().min(3, { error: "Enter the street address." }),
  line2: z.string().trim().optional().or(z.literal("")),
  city: z.string().trim().min(2, { error: "Enter a city." }),
  state: z.string().trim().min(2, { error: "Enter a state." }),
  postalCode: z.string().trim().min(3, { error: "Enter a postal code." }),
  country: z.string().trim().min(2, { error: "Enter a country." }),
  type: z.enum(["shipping", "billing"]),
  isDefault: z.boolean().optional(),
});

export const ProfileSchema = z.object({
  name: z.string().trim().min(2, { error: "Name must be at least 2 characters." }),
  phone: z.string().trim().optional().or(z.literal("")),
});
