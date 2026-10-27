import type { ChangeEventHandler } from "react";
import Icon from "@/shared/components/Icon";

type CheckboxProps = {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function Checkbox({ checked,onChange }: CheckboxProps) {
  return (
    <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
      <input
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className="peer absolute inset-0 size-full appearance-none rounded-[5px] border border-(--border) bg-(--surface) checked:border-(--focus) checked:bg-(--focus)  cursor-pointer"
      />
      <span className="pointer-events-none absolute text-(--on-primary) opacity-0 peer-checked:opacity-100">
        <Icon name="check" size={14} />
      </span>
    </span>
  );
}
