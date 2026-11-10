import Checkbox from "@/shared/components/Checkbox";
import { useState, type ChangeEventHandler } from "react";

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
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const showFallback = !imgSrc || imageFailed;

  const showPlaceholder = Boolean(imgSrc) && !imageFailed && !imageLoaded;

  let hostname = tabUrl;

  try {
    hostname = new URL(tabUrl).hostname;
  } catch (e) {
    console.warn("آدرس تب معتبر نیست:", tabUrl);
  }

  return (
    <label className="flex items-center gap-2 w-full p-2 rounded-(--r-md) hover:bg-(--surface-hover)">
      <Checkbox checked={checked} onChange={onChange} />
      
      <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded">
        {showFallback && (
          <span className="bg-(--surface-hover)">
            {title.charAt(0).toUpperCase()}
          </span>
        )}

        {showPlaceholder && (
          <span
            aria-hidden="true"
            className="tab-icon-skeleton absolute inset-0"
          />
        )}

        {imgSrc && !imageFailed && (
          <img
            src={imgSrc}
            alt={`${title} icon`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
            className={`size-full object-contain ${imageLoaded ? "" : "invisible"}`}
          />
        )}
      </span>

      <div className="flex flex-col">
        <strong className="text-(--text) text-[10px]">{title}</strong>
        <small className="text-(--secondary) text-[9px]">{hostname}</small>
      </div>
    </label>
  );
}
