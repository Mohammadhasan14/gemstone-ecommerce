"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

export function FloatingChatButton() {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      onClick={() =>
        toast("A gemologist will be with you shortly", {
          description: "Free expert consultation, no obligation.",
        })
      }
      aria-label="Chat with a gemologist"
      className="fixed right-4 bottom-4 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-teal text-ivory shadow-[0_16px_36px_-12px_rgba(15,118,110,.6)] transition-colors duration-200 hover:bg-teal-dark sm:right-7 sm:bottom-7 sm:h-14 sm:w-14"
    >
      <MessageCircle size={20} strokeWidth={1.9} className="sm:hidden" />
      <MessageCircle size={22} strokeWidth={1.9} className="hidden sm:block" />
    </motion.button>
  );
}
