import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "danger" | "none";
};

export default function Button({
  type = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={`button select-none ${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}
