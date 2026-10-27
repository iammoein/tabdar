import { getBrowserTabs, getBrowserWindows } from "@/services/browser/tabs";
import { useState, useEffect } from "react";

export default function useBrowserTabs() {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const [windows, setWindows] = useState<chrome.windows.Window[]>([]);
  const [selectedTabIds, setSelectedTabIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const getTabs = async () => {
      const browserTabs = await getBrowserTabs();
      setTabs(browserTabs);
    };

    getTabs();
  }, []);

  useEffect(() => {
    const getWindows = async () => {
      const browserWindows = await getBrowserWindows();
      setWindows(browserWindows);
    };

    getWindows();
  }, []);

  const validTabs = tabs.flatMap((tab) =>
    tab.id === undefined ? [] : [tab.id],
  );

  const allTabsSelected =
    validTabs.length > 0 && validTabs.every((id) => selectedTabIds.has(id));

  const handleSelectAllTabs = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTabIds(event.target.checked ? new Set(validTabs) : new Set());
  };

  const handleSelectTab = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number | undefined,
  ) => {
    if (id === undefined) return;

    setSelectedTabIds((current) => {
      const next = new Set(current);

      if (event.target.checked) next.add(id);
      else next.delete(id);

      return next;
    });
  };

  return {
    tabs,
    windows,
    selectedTabIds,
    allTabsSelected,
    handleSelectAllTabs,
    handleSelectTab,
  };
}
