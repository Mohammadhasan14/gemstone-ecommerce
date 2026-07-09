import { forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-[13.5px] font-bold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-teal text-ivory hover:bg-teal-dark",
  outline: "border border-ink/15 bg-transparent text-ink hover:border-teal hover:text-teal",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", ...props }, ref) => {
    return <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props} />;
  }
);
Button.displayName = "Button";
