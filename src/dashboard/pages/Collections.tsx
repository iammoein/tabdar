import CollectionList from "@/features/collections/components/CollectionList";
import useCollections from "@/features/collections/hooks/useCollections";
import { useCollectionsStore } from "@/features/collections/store/useCollectionsStore";
import type { CollectionTab } from "@/features/collections/types/collection.types";
import { closeTabs, restoreTabs } from "@/services/browser/tabs";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";

export default function Collections() {
  const {
    collections,
    handleDeleteCollection,
    handleRenameCollection,
    handleDuplicateCollection,
  } = useCollections();

  const restoredCollections = useCollectionsStore(
    (state) => state.restoredCollections,
  );

  const addRestoredTabs = useCollectionsStore((state) => state.addRestoredTabs);

  const removeRestoredTabs = useCollectionsStore(
    (state) => state.removeRestoredTabs,
  );

  const handleRestoreTab = async (
    collectionId: string,
    tabs: CollectionTab[],
  ) => {
    const restoreTabIds = await restoreTabs(tabs);
    addRestoredTabs(collectionId, restoreTabIds);
  };

  const handleCloseTab = async (collectionId: string) => {
    const tabIds = restoredCollections[collectionId];

    if (!tabIds?.length) return;

    await closeTabs(tabIds);

    removeRestoredTabs(collectionId);
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
        restoredCollections={restoredCollections}
        onRestoreTab={handleRestoreTab}
        onCloseTab={handleCloseTab}
        onDeleteCollection={handleDeleteCollection}
        onRenameCollection={handleRenameCollection}
        onDuplicationCollection={handleDuplicateCollection}
      />
    </div>
  );
}
