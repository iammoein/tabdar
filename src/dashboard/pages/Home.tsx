import { useState } from "react";

import type { CollectionTab } from "@/features/collections/types/collection.types";
import { closeTabs, restoreTabs } from "@/services/browser/tabs";
import BrowserTabList from "@/features/tabs/components/BrowserTabList";
import useBrowserTabs from "@/features/tabs/hooks/useBrowserTabs";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import SaveCollectionModal from "@/features/collections/components/SaveCollectionModal";
import useCollections from "@/features/collections/hooks/useCollections";
import CollectionList from "@/features/collections/components/CollectionList";
import { Link } from "react-router";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [isSaveModal, setIsSaveModal] = useState(false);

  const { tabs, selectedTabIds, handleSelectAllTabs, handleSelectTab } =
    useBrowserTabs();

  const { collections, handleSaveCollection } = useCollections();

  const filteredTabs = tabs.filter(
    (tab) =>
      tab.title?.toLowerCase().includes(searchInput) ||
      tab.url?.toLowerCase().includes(searchInput),
  );

  const filteredTabsSelected =
    filteredTabs.length > 0 &&
    filteredTabs.every(
      (tab) => tab.id !== undefined && selectedTabIds.has(tab.id),
    );

  const selectedTabs = tabs.filter(
    (tab) => tab.id !== undefined && selectedTabIds.has(tab.id),
  );

  const handleCloseTabs = async (tabIds: Set<number>) => {
    await closeTabs(tabIds);
  };

  const handleRestorTab = async (tabs: CollectionTab[]) => {
    await restoreTabs(tabs);
  };

  return (
    <>
      <div className="mb-7">
        <p className="text-[12px] font-semibold text-(--primary)">
          Today’s Workspace
        </p>
        <h1 className="text-[27px] text-(--text)">Open Tabs</h1>
        <p className="text-[14px] text-(--secondary)">
          Select related tabs, save them in a collection, and close them with
          confidence.
        </p>
      </div>

      <div className="w-full overflow-hidden rounded-(--r-lg) border border-(--border) bg-(--surface)">
        <div className="flex w-full justify-between gap-20 px-5 py-4.5">
          <Input
            placeholder="Search tab's title or url..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-(--r-sm) bg-(--primary-soft) px-2 text-(--primary)">
              {selectedTabIds.size}
            </span>
            <small className="text-[12px] whitespace-nowrap text-(--secondary)">
              Selected tabs
            </small>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between bg-(--surface-subtle) p-5.5">
            <span className="flex gap-2.25">
              <Checkbox
                checked={filteredTabsSelected}
                onChange={(e) => handleSelectAllTabs(e, filteredTabs)}
              />
              <small className="text-[11px] text-(--secondary)">
                Select all
              </small>
            </span>
            <small className="text-[11px] text-(--muted)">
              {filteredTabs.length} shown tab
            </small>
          </div>
          <div className="p-4">
            <BrowserTabList
              tabs={filteredTabs}
              selectedTabIds={selectedTabIds}
              handleSelectTab={handleSelectTab}
            />
          </div>
        </div>

        <div className="flex items-center justify-between bg-(--surface-subtle) px-5 py-3">
          <p className="text-[11px] text-(--muted) select-none">
            Your selection is kept while this page remains open.
          </p>

          <div className="flex items-center gap-1">
            <Button
              variant="danger"
              onClick={() => handleCloseTabs(selectedTabIds)}
            >
              <Icon name="close" />
              Close Selected Tabs
            </Button>
            <Button variant="primary" onClick={() => setIsSaveModal(true)}>
              Save {selectedTabIds.size} tab
            </Button>
          </div>
        </div>

        {isSaveModal && (
          <SaveCollectionModal
            selectedTabLength={selectedTabIds.size}
            selectedTabs={selectedTabs}
            onSave={handleSaveCollection}
            onClose={() => setIsSaveModal(false)}
          />
        )}
      </div>

      <div className="mt-10 mb-7 flex justify-between">
        <div>
          <h2 className="mb-1 text-[19px] text-(--text)">Recent Collections</h2>
          <p className="text-[12px] text-(--secondary)">
            Quickly return to unfinished work.
          </p>
        </div>

        <Link
          to="/collections"
          className="flex self-end text-[12px] text-(--primary) hover:text-(--secondary)"
        >
          View All <Icon name="arrow" size={17} />
        </Link>
      </div>

      <CollectionList
        collections={collections}
        onRestoreTab={handleRestorTab}
        limit={3}
      />
    </>
  );
}
