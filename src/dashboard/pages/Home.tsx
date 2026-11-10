import { useState } from "react";

import BrowserTabList from "@/features/tabs/components/BrowserTabList";
import useBrowserTabs from "@/features/tabs/hooks/useBrowserTabs";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");

  const { tabs, selectedTabIds, handleSelectAllTabs, handleSelectTab } =
    useBrowserTabs();

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

  return (
    <div className="w-full bg-(--surface) border border-(--border) rounded-(--r-lg) overflow-hidden">
      <div className="flex justify-between gap-20 w-full px-5 py-4.5">
        <Input
          placeholder="Search tab's title or url..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center size-7 px-2 bg-(--primary-soft) text-(--primary) rounded-(--r-sm)">
            {selectedTabIds.size}
          </span>
          <small className="text-[12px] text-(--secondary) whitespace-nowrap">
            Selected tabs
          </small>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center p-5.5 bg-(--surface-subtle)">
          <span className="flex gap-2.25">
            <Checkbox
              checked={filteredTabsSelected}
              onChange={(e) => handleSelectAllTabs(e, filteredTabs)}
            />
            <small className="text-[11px] text-(--secondary)">Select all</small>
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

      <div className="flex justify-between items-center py-3 px-5 bg-(--surface-subtle)">
        <p className="text-(--muted) text-[11px] select-none">
          Your selection is kept while this page remains open.
        </p>

        <div className="flex items-center gap-1">
          <Button variant="danger">
            <Icon name="close" />
            Close Selected Tabs
          </Button>
          <Button variant="primary">Save {selectedTabIds.size} tab</Button>
        </div>
      </div>
    </div>
  );
}
