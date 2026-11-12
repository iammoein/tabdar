import CollectionIcon from "@/features/collections/components/CollectionIcon";
import type {
  Collection,
  CollectionTab,
} from "@/features/collections/types/collection.types";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";

type QuickCollectionProps = {
  collections: Collection[];
  onRestoreTab: (tabs: CollectionTab[]) => void;
};

export default function QuickCollection({
  collections,
  onRestoreTab,
}: QuickCollectionProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <strong className="text-(--text) text-[12px]">Last Collection</strong>

        <span className="text-(--primary)">See All</span>
      </div>

      <ul className="tab-list-scroll flex flex-col gap-4 max-h-77 overflow-y-auto p-1">
        {collections.map((collection) => (
          <li
            key={collection.id}
            className="grid grid-cols-[36px_1fr_34px] items-center gap-3 rounded-(--r-md) border border-(--border) bg-(--surface-subtle) p-2.5"
          >
            <CollectionIcon />
            <div className="flex flex-col w-full">
              <strong className="text-(--text) text-[10px]">
                {collection.title}
              </strong>
              <small className="text-(--muted)">
                {collection.tabs.length} tab
              </small>
            </div>

            <Button
              variant="none"
              className="flex size-8 items-center justify-center hover:transform-none"
              onClick={() => {
                onRestoreTab(collection.tabs);
              }}
            >
              <Icon name="external" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
