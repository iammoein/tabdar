import { useState } from "react";

import type { CollectionTab } from "@/features/collections/types/collection.types";
import SaveCollectionModal from "@/features/collections/components/SaveCollectionModal";
import BrowserTabList from "@/features/tabs/components/BrowserTabList";
import useBrowserTabs from "@/features/tabs/hooks/useBrowserTabs";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import Icon from "@/shared/components/Icon";

import QuickCollection from "@/features/collections/components/QuickCollection";
import Divider from "@/shared/components/Divider";
import { restoreTabs } from "@/services/browser/tabs";
import useCollections from "@/features/collections/hooks/useCollections";
import { openDashboard } from "@/services/browser/dashboard";

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
    <main className="flex flex-col min-h-screen min-w-120 p-4.5 bg-(--popup-background)">
      <div className="flex justify-between items-center w-full h-11 py-3 px-3.5 bg-(--elevated) border border-(--border) rounded-(--r-md)">
        <strong>{tabs.length} tab open</strong>
        <small>Open in {windows.length} window</small>
      </div>
      <label className="w-full flex justify-between items-center mt-4.75 mb-2.25">
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

      <div className="flex flex-col justify-center gap-3 mt-3">
        <Divider />

        <QuickCollection
          collections={collections}
          onRestoreTab={handleRestorTab}
        />

        <Divider />
      </div>

      <Button variant="none" className="mt-2 text-(--secondary) hover:text-(--primary) hover:bg-transparent" onClick={openDashboard}>
        Go To Tabdar Pannel
      </Button>
    </main>
  );
}
