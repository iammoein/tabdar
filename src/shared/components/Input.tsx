import type { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input">;

export default function Input({ type, className = "", ...props }: InputProps) {
  const inputClasses = `w-full min-h-8 py-3 px-3.25 bg-(--surface) border border-(--border) rounded-(--r-sm) focus:outline-none focus:border-(--primary) focus:shadow-[0_0_0_3px_var(--primary)/14] ${className}`;

  return <input type={type} className={inputClasses} {...props} />;
}
