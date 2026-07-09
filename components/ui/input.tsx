import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ invalid = false, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-teal ${
          invalid ? "border-[#B4304A]" : "border-ink/15"
        } ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
