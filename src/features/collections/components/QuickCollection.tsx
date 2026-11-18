import CollectionIcon from "@/features/collections/components/CollectionIcon";
import type {
  Collection,
  CollectionTab,
} from "@/features/collections/types/collection.types";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";

type QuickCollectionProps = {
  collections: Collection[];
  restoredCollections: Record<string, number[]>;
  onRestoreTab: (id: string, tabs: CollectionTab[]) => void;
  onCloseTab: (id: string) => void;
  onSeeAll: () => void;
};

export default function QuickCollection({
  collections,
  restoredCollections,
  onRestoreTab,
  onCloseTab,
  onSeeAll,
}: QuickCollectionProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <strong className="text-[12px] text-(--text)">Last Collection</strong>

        <Button
          variant="none"
          className="text-(--primary) hover:text-(--primary-hover)"
          onClick={onSeeAll}
        >
          See All
        </Button>
      </div>

      <ul className="flex flex-col gap-4 p-1">
        {collections.map((collection) => {
          const isCloseBtn =
            (restoredCollections[collection.id]?.length ?? 0) > 0;

          return (
            <li
              key={collection.id}
              className="grid grid-cols-[36px_1fr_34px] items-center gap-3 rounded-(--r-md) border border-(--border) bg-(--surface-subtle) p-2.5"
            >
              <CollectionIcon />
              <div className="flex w-full flex-col">
                <strong className="text-[10px] text-(--text)">
                  {collection.title}
                </strong>
                <small className="text-(--muted)">
                  {collection.tabs.length} tab
                </small>
              </div>

              {!isCloseBtn ? (
                <Button
                  variant="none"
                  className="flex size-8 items-center justify-center hover:transform-none"
                  onClick={() => {
                    onRestoreTab(collection.id, collection.tabs);
                  }}
                >
                  <Icon name="external" />
                </Button>
              ) : (
                <Button
                  variant="none"
                  className="flex size-8 items-center justify-center border border-(--danger-soft) text-(--danger) hover:transform-none hover:bg-(--danger-soft)"
                  onClick={() => {
                    onCloseTab(collection.id);
                  }}
                >
                  <Icon name="close" />
                </Button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
