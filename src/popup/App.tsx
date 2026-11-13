import { useState } from "react";

import QuickCollection from "@/features/collections/components/QuickCollection";
import SaveCollectionModal from "@/features/collections/components/SaveCollectionModal";
import useCollections from "@/features/collections/hooks/useCollections";
import type { CollectionTab } from "@/features/collections/types/collection.types";
import BrowserTabList from "@/features/tabs/components/BrowserTabList";
import useBrowserTabs from "@/features/tabs/hooks/useBrowserTabs";
import { openDashboard } from "@/services/browser/dashboard";
import { restoreTabs } from "@/services/browser/tabs";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import Divider from "@/shared/components/Divider";
import Icon from "@/shared/components/Icon";

export default function App() {
  const {
    tabs,
    windows,
    selectedTabIds,
    allTabsSelected,
    handleSelectAllTabs,
    handleSelectTab,
  } = useBrowserTabs();

  const [isSaveModal, setisSaveModal] = useState(false);

  const selectedTabsLength = selectedTabIds.size;

  const selectedTabs = tabs.filter(
    (tab) => tab.id !== undefined && selectedTabIds.has(tab.id),
  );

  const { collections, handleSaveCollection } = useCollections();

  const handleSaveTabs = () => {
    setisSaveModal(true);
  };

  const handleRestorTab = async (tabs: CollectionTab[]) => {
    await restoreTabs(tabs);
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
            onChange={(e) => handleSelectAllTabs(e, tabs)}
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
          onSave={handleSaveCollection}
          onClose={() => setisSaveModal(false)}
        />
      )}

      <BrowserTabList
        tabs={tabs}
        selectedTabIds={selectedTabIds}
        handleSelectTab={handleSelectTab}
      />

      <Button onClick={handleSaveTabs}>
        <Icon name="archive" size={18} />
        Save {selectedTabsLength} selected Tab
      </Button>

      <div className="mt-3 flex flex-col justify-center gap-3">
        <Divider />

        <QuickCollection
          collections={collections}
          onRestoreTab={handleRestorTab}
        />

        <Divider />
      </div>

      <Button
        variant="none"
        className="mt-2 text-(--secondary) hover:bg-transparent hover:text-(--primary)"
        onClick={openDashboard}
      >
        Go To Tabdar Pannel
      </Button>
    </main>
  );
}
