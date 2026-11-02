import type { Collection } from "@/features/collections/types/collection.types";
import Icon from "@/shared/components/Icon";
import Button from "@/shared/components/Button";

type QuickCollectionProps = {
  collections: Collection[];
};

export default function QuickCollection({ collections }: QuickCollectionProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <strong className="text-(--text) text-[12px]">Last Collection</strong>

        <span className="text-(--primary)">See All</span>
      </div>

      <ul>
        {collections.map((collection) => (
          <li className="grid grid-cols-[36px_1fr_34px] items-center gap-3 rounded-(--r-md) border border-(--border) bg-(--surface-subtle) p-2.5">
            <div className="flex items-center justify-center size-10.5 bg-(--primary-soft) rounded-(--r-lg)">
              <Icon name="archive" color="var(--primary)" />
            </div>
            <div className="flex flex-col w-full">
              <strong className="text-(--text) text-[15px]">
                {collection.title}
              </strong>
              <small className="text-(--muted)">
                {collection.tabs.length} tab
              </small>
            </div>

            <Button
              variant="none"
              className="flex size-8 items-center justify-center hover:transform-none"
            >
              <Icon name="external" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
