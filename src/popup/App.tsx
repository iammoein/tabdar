import { useEffect, useState } from "react";

import QuickCollection from "@/features/collections/components/QuickCollection";
import SaveCollectionModal from "@/features/collections/components/SaveCollectionModal";
import useCollections from "@/features/collections/hooks/useCollections";
import { useCollectionsStore } from "@/features/collections/store/useCollectionsStore";
import type {
  Collection,
  CollectionTab,
} from "@/features/collections/types/collection.types";
import BrowserTabList from "@/features/tabs/components/BrowserTabList";
import { initTabsStore } from "@/features/tabs/store/initTabsStore";
import { useTabsStore } from "@/features/tabs/store/useTabsStore";
import { openDashboard } from "@/services/browser/dashboard";
import { closeTabs, restoreTabs } from "@/services/browser/tabs";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import Divider from "@/shared/components/Divider";
import Icon from "@/shared/components/Icon";

export default function App() {
  const [isSaveModal, setisSaveModal] = useState(false);

  useEffect(() => initTabsStore(), []);

  const tabs = useTabsStore((state) => state.tabs);
  const windows = useTabsStore((state) => state.windows);
  const selectedTabIds = useTabsStore((state) => state.selectedTabIds);
  const selectAllTabs = useTabsStore((state) => state.selectAllTabs);
  const selectTab = useTabsStore((state) => state.selectTab);
  const clearSelectedTabs = useTabsStore((state) => state.clearSelectedTabs);

  const addRestoredTabs = useCollectionsStore((state) => state.addRestoredTabs);

  const restoredCollections = useCollectionsStore(
    (state) => state.restoredCollections,
  );

  const removeRestoredTabs = useCollectionsStore(
    (state) => state.removeRestoredTabs,
  );

  const validTabs = tabs.flatMap((tab) =>
    tab.id === undefined ? [] : [tab.id],
  );
  const allTabsSelected =
    validTabs.length > 0 && validTabs.every((id) => selectedTabIds.has(id));

  const selectedTabsLength = selectedTabIds.size;

  const selectedTabs = tabs.filter(
    (tab) => tab.id !== undefined && selectedTabIds.has(tab.id),
  );

  const { collections, handleSaveCollection } = useCollections();

  const handleSaveTabs = () => {
    setisSaveModal(true);
  };

  const handleSave = async (collection: Collection) => {
    await handleSaveCollection(collection);

    clearSelectedTabs();
  };

  const handleRestorTab = async (
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
    <main className="flex max-h-150 w-100 flex-col gap-3 overflow-y-auto overscroll-contain bg-(--popup-background) p-4.5">
      <div className="flex h-11 w-full items-center justify-between rounded-(--r-md) border border-(--border) bg-(--elevated) px-3.5 py-3">
        <strong>{tabs.length} tab open</strong>
        <small>Open in {windows.length} window</small>
      </div>
      <label className="mt-4.75 mb-2.25 flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <strong>Select All Tabs</strong>
          <Checkbox
            checked={allTabsSelected}
            onChange={(e) => selectAllTabs(tabs, e.target.checked)}
          />
        </div>

        <small className="text-(--primary)">
          selected {selectedTabsLength}
        </small>
      </label>

      {isSaveModal && (
        <SaveCollectionModal
          selectedTabLength={selectedTabsLength}
          selectedTabs={selectedTabs}
          onSave={handleSave}
          onClose={() => setisSaveModal(false)}
        />
      )}

      <BrowserTabList
        tabs={tabs}
        selectedTabIds={selectedTabIds}
        handleSelectTab={(event, id) => selectTab(id, event.target.checked)}
      />

      <Button onClick={handleSaveTabs}>
        <Icon name="archive" size={18} />
        Save {selectedTabsLength} selected Tab
      </Button>

      <div className="mt-3 flex flex-col justify-center gap-3">
        <Divider />

        <QuickCollection
          collections={collections}
          restoredCollections={restoredCollections}
          onRestoreTab={handleRestorTab}
          onSeeAll={() => openDashboard("collections")}
          onCloseTab={handleCloseTab}
        />
      </div>

      <div className="flex flex-col items-center gap-3">
        <Divider />

        <Button
          variant="none"
          className="mt-2 text-(--secondary) hover:bg-transparent hover:text-(--primary)"
          onClick={() => openDashboard()}
        >
          Go To Tabdar Pannel
          <Icon name="external" />
        </Button>
      </div>
    </main>
  );
}
