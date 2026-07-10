import "server-only";

// No email provider is configured yet (no Resend/SES account for this project).
// Once one exists, replace the body of this function with a real send call —
// every call site below is already wired to the right moment (after payment
// capture), so nothing else needs to change.
export async function sendOrderConfirmationEmail(params: { to: string; orderNumber: string; totalMinor: number; currency: string }) {
  if (!process.env.EMAIL_PROVIDER_API_KEY) {
    console.log(
      `[stub email] Would send order confirmation for ${params.orderNumber} to ${params.to} (${params.currency} ${(params.totalMinor / 100).toFixed(2)})`
    );
    return { sent: false as const };
  }

  // Real provider call goes here once EMAIL_PROVIDER_API_KEY is set.
  return { sent: false as const };
}
