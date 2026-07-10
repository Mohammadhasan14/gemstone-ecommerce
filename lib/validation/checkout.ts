import * as z from "zod";

export const CheckoutAddressSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }).trim(),
  fullName: z.string().trim().min(2, { error: "Enter the recipient's full name." }),
  phone: z.string().trim().min(6, { error: "Enter a valid phone number." }),
  line1: z.string().trim().min(3, { error: "Enter the street address." }),
  line2: z.string().trim().optional().or(z.literal("")),
  city: z.string().trim().min(2, { error: "Enter a city." }),
  state: z.string().trim().min(2, { error: "Enter a state." }),
  postalCode: z.string().trim().min(3, { error: "Enter a postal code." }),
  country: z.string().trim().min(2, { error: "Enter a country." }),
});

export const DiscountCodeSchema = z.object({
  code: z.string().trim().min(1, { error: "Enter a discount code." }),
});
