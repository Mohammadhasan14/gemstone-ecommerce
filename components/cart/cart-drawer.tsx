"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { CartLineItem, type CartLine } from "./cart-line-item";
import { CartSummary } from "./cart-summary";
import { EASE_OUT } from "@/components/motion";

export function CartDrawer({
  open,
  onClose,
  items,
  currency,
}: {
  open: boolean;
  onClose: () => void;
  items: CartLine[];
  currency: string;
}) {
  const subtotalMinor = items.reduce((sum, item) => sum + item.priceMinor * item.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="fixed inset-y-0 right-0 z-[71] flex w-[88%] max-w-sm flex-col bg-ivory shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink/8 px-5 py-4">
              <h2 className="font-serif text-lg text-ink">Your Cart</h2>
              <button type="button" onClick={onClose} aria-label="Close cart" className="text-ink/60 hover:text-ink">
                <X size={20} strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5">
              {items.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted">Your cart is empty.</p>
              ) : (
                <div className="divide-y divide-ink/6">
                  {items.map((item) => (
                    <CartLineItem key={item.id} item={item} onClose={onClose} />
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-5 pb-6">
                <CartSummary subtotalMinor={subtotalMinor} currency={currency} onCheckoutClick={onClose} />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
