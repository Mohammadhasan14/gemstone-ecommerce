"use client";

import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

export function FloatingChatButton() {
  return (
    <button
      onClick={() =>
        toast("A gemologist will be with you shortly", {
          description: "Free expert consultation, no obligation.",
        })
      }
      aria-label="Chat with a gemologist"
      className="fixed right-7 bottom-7 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-teal text-ivory shadow-[0_16px_36px_-12px_rgba(15,118,110,.6)] transition-all duration-200 hover:-translate-y-1 hover:bg-teal-dark"
    >
      <MessageCircle size={22} strokeWidth={1.9} />
    </button>
  );
}
