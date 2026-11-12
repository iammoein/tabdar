import type { ChangeEvent } from "react";

import BrowserTabItem from "@/features/tabs/components/BrowserTabItem";

type TabListProps = {
  tabs: chrome.tabs.Tab[];
  selectedTabIds: Set<number>;
  handleSelectTab: (
    event: ChangeEvent<HTMLInputElement>,
    tabId?: number,
  ) => void;
};

export default function BrowserTabList({
  tabs,
  selectedTabIds,
  handleSelectTab,
}: TabListProps) {
  return (
    <ul className="tab-list-scroll flex flex-col gap-1 max-h-77 overflow-y-auto p-1">
      {tabs.map((tab) => (
        <li key={tab.id}>
          <BrowserTabItem
            title={tab.title ?? "تب بدون عنوان"}
            tabUrl={tab.url ?? "آدرس در دسترس نیست"}
            imgSrc={tab.favIconUrl ?? ""}
            onChange={(e) => handleSelectTab(e, tab.id)}
            checked={tab.id !== undefined && selectedTabIds.has(tab.id)}
          />
        </li>
      ))}
    </ul>
  );
}
