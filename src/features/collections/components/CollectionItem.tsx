import type {
  Collection,
  CollectionTab,
} from "@/features/collections/types/collection.types";

import CollectionIcon from "@/features/collections/components/CollectionIcon";
import Icon from "@/shared/components/Icon";
import Button from "@/shared/components/Button";
import formatDate from "@/shared/utils/formatDate";

type CollectionItemProps = {
  collection: Collection;
  onRestoreTab: (tabs: CollectionTab[]) => void;
};

export default function CollectionItem({
  collection: { title, description, tabs, createdAt },
  onRestoreTab,
}: CollectionItemProps) {
  return (
    <article className="flex h-full w-full flex-col justify-center gap-4 rounded-(--r-md) border border-(--border) bg-(--surface) p-4.5 hover:-translate-y-1 transition-transform duration-250">
      <div className="flex justify-between">
        <CollectionIcon />
        <Button
          variant="none"
          className="min-h-0 self-center hover:bg-transparent hover:text-(--primary)"
        >
          <Icon name="more" />
        </Button>
      </div>

      <div className="flex min-h-18 w-full flex-col">
        <h3 className="text-[14px] text-(--text)">{title}</h3>
        <p className="h-16 overflow-y-auto text-[11px] text-(--secondary)">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-full bg-(--primary-soft) px-2.5 py-1 text-(--primary)">
          {tabs.length} tabs
        </span>

        <span className="text-[10px] text-(--muted)">
          {formatDate(createdAt)}
        </span>
      </div>

      <Button
        variant="secondary"
        className="flex w-full gap-2"
        onClick={() => onRestoreTab(tabs)}
      >
        <Icon name="external" />
        Open Tabs
      </Button>
    </article>
  );
}
