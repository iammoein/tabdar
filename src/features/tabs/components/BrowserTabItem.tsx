import Checkbox from "@/shared/components/Checkbox";
import type { ChangeEventHandler } from "react";

type TabProps = {
  title: string;
  tabUrl: string;
  imgSrc: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function BrowserTabItem({
  title,
  tabUrl,
  imgSrc,
  checked,
  onChange,
}: TabProps) {
  let hostname = tabUrl;

  try {
    hostname = new URL(tabUrl).hostname;
  } catch (e) {
    console.warn("آدرس تب معتبر نیست:", tabUrl);
  }

  return (
    <label className="flex items-center gap-2 w-full p-2 rounded-(--r-md) hover:bg-(--surface-hover)">
      <Checkbox checked={checked} onChange={onChange} />
      <img src={imgSrc} alt={`${imgSrc} icon`} className="size-8" />
      <div className="flex flex-col">
        <strong>{title}</strong>
        <small>{hostname}</small>
      </div>
    </label>
  );
}
