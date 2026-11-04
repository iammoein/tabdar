import type { HTMLAttributes, MouseEvent, ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  contentClassName?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "onClose">;

export default function Modal({
  children,
  onClose,
  className = "",
  contentClassName = "",
  ...props
}: ModalProps) {
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className={`overlay ${className}`} onMouseDown={handleBackdropClick}>
      <div
        role="dialog"
        className={`max-h-[calc(100dvh-40px)] overflow-y-auto overscroll-contain ${contentClassName}`}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
