"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { CheckoutAddressSchema } from "@/lib/validation/checkout";
import { getUser } from "@/lib/dal";
import { getOrCreateCurrentCart, getCurrentCartReadOnly } from "@/lib/cart";
import { getCartWithItems, clearCart } from "@/lib/db/queries/cart";
import { createOrderFromCart, markOrderPaid } from "@/lib/db/queries/orders";
import { getActiveDiscountByCode, incrementDiscountUsage } from "@/lib/db/queries/discounts";
import { sendOrderConfirmationEmail } from "@/lib/email/send-order-confirmation";

export type CheckoutFormState =
  | {
      errors?: Partial<Record<keyof import("zod").infer<typeof CheckoutAddressSchema>, string[]>>;
      message?: string;
    }
  | undefined;

export async function placeOrder(_state: CheckoutFormState, formData: FormData): Promise<CheckoutFormState> {
  const validated = CheckoutAddressSchema.safeParse({
    email: formData.get("email"),
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    line1: formData.get("line1"),
    line2: formData.get("line2"),
    city: formData.get("city"),
    state: formData.get("state"),
    postalCode: formData.get("postalCode"),
    country: formData.get("country"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const cart = await getOrCreateCurrentCart();
  const items = await getCartWithItems(cart.id);

  if (items.length === 0) {
    return { message: "Your cart is empty." };
  }

  const unavailable = items.find((item) => item.status !== "active");
  if (unavailable) {
    return { message: `"${unavailable.name}" is no longer available — please remove it from your cart.` };
  }

  const { email, line2, ...shippingRest } = validated.data;
  const shipping = { ...shippingRest, line2: line2 || undefined };

  const discountCodeRaw = String(formData.get("discountCode") ?? "").trim();
  let discount: { type: "percent" | "fixed"; value: number } | undefined;
  let discountCode: string | undefined;

  if (discountCodeRaw) {
    const subtotalMinor = items.reduce((sum, item) => sum + item.priceMinor * item.quantity, 0);
    const result = await getActiveDiscountByCode(discountCodeRaw, subtotalMinor);
    if (!result.ok) {
      return { message: result.reason };
    }
    discount = { type: result.discount.type, value: result.discount.value };
    discountCode = result.discount.code;
  }

  const user = await getUser();

  const order = await createOrderFromCart({
    items,
    userId: user?.id,
    email,
    shipping,
    discountCode,
    discount,
  });

  if (discountCode) await incrementDiscountUsage(discountCode);

  redirect(`/checkout/payment/${order.id}`);
}

// Stands in for the Razorpay webhook until real API keys exist — performs exactly
// what POST /api/webhooks/razorpay would do on a verified `payment.captured` event:
// mark the order + payment paid, flip inventory, clear the cart.
export async function simulatePayment(orderId: string) {
  const updated = await markOrderPaid(orderId, `pay_stub_${Date.now()}`, JSON.stringify({ simulated: true }));
  if (!updated) return { ok: false as const };

  const cart = await getCurrentCartReadOnly();
  if (cart) await clearCart(cart.id);

  await sendOrderConfirmationEmail({
    to: updated.email,
    orderNumber: updated.orderNumber,
    totalMinor: updated.totalMinor,
    currency: updated.currency,
  });

  revalidatePath("/", "layout");
  return { ok: true as const };
}
