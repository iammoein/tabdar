import { useState } from "react";

import SaveCollectionModal from "@/features/collections/components/SaveCollectionModal";
import type { Collection } from "@/features/collections/types/collection.types";
import BrowserTabList from "@/features/tabs/components/BrowserTabList";
import useBrowserTabs from "@/features/tabs/hooks/useBrowserTabs";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
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

  const [isModal, setIsModal] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const selectedTabsLength = selectedTabIds.size;

  const selectedTabs = tabs.filter(
    (tab) => tab.id !== undefined && selectedTabIds.has(tab.id),
  );

  const handleSaveTabs = () => {
    setIsModal(true);
  };

  const handleSaveCollection = (newCollection: Collection) => {
    setCollections((prev) => [...prev, newCollection]);
  };

  console.log(collections);

  return (
    <main className="flex flex-col min-h-screen min-w-120 p-4.5 bg-(--popup-background)">
      <div className="flex justify-between items-center w-full h-11 py-3 px-3.5 bg-[#262933] border border-(--border) rounded-(--r-md)">
        <strong>{tabs.length} tab open</strong>
        <small>Open in {windows.length} window</small>
      </div>
      <label className="w-full flex justify-between items-center mt-4.75 mb-2.25">
        <div className="flex items-center gap-2">
          <strong>Select All Tabs</strong>
          <Checkbox checked={allTabsSelected} onChange={handleSelectAllTabs} />
        </div>

        <small className="text-(--primary)">
          selected {selectedTabsLength}
        </small>
      </label>

      {isModal && (
        <SaveCollectionModal
          selectedTabLength={selectedTabsLength}
          selectedTabs={selectedTabs}
          onSave={handleSaveCollection}
          onClose={() => setIsModal(false)}
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
    </main>
  );
}
