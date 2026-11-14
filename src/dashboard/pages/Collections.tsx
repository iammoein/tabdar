import CollectionList from "@/features/collections/components/CollectionList";
import useCollections from "@/features/collections/hooks/useCollections";
import type { CollectionTab } from "@/features/collections/types/collection.types";
import { restoreTabs } from "@/services/browser/tabs";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";

export default function Collections() {
  const {
    collections,
    handleDeleteCollection,
    handleRenameCollection,
    handleDuplicateCollection,
  } = useCollections();

  const handleRestoreTab = async (tabs: CollectionTab[]) => {
    await restoreTabs(tabs);
  };

  return (
    <div>
      <div className="mb-7 flex justify-between">
        <div className="flex flex-col">
          <p className="text-[12px] font-semibold text-(--primary)">
            Personal Library
          </p>
          <h1 className="text-[27px] text-(--text)">Saved Collections</h1>
          <p className="text-[14px] text-(--secondary)">
            All your saved resources, organized and ready to restore.
          </p>
        </div>

        <Button className="self-end">
          <Icon name="plus" />
          New Collection
        </Button>
      </div>

      <CollectionList
        collections={collections}
        onRestoreTab={handleRestoreTab}
        onDeleteCollection={handleDeleteCollection}
        onRenameCollection={handleRenameCollection}
        onDuplicationCollection={handleDuplicateCollection}
      />
    </div>
  );
}
