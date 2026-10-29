import type { ComponentPropsWithoutRef } from "react";

type TextareaProps = ComponentPropsWithoutRef<"textarea">;

export default function Textarea({ className = "", ...props }: TextareaProps) {
  const textareaClasses = `w-full min-h-24 py-3 px-3.25 bg-(--surface) border border-(--border) rounded-(--r-sm) resize-y focus:outline-none focus:border-(--primary) focus:shadow-[0_0_0_3px_var(--primary)/14%] ${className}`;

  return <textarea className={textareaClasses} {...props} />;
}
