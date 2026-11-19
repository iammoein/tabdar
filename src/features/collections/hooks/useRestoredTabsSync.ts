import { useEffect } from "react";

import syncRestoredCollections from "@/features/collections/services/syncRestoredCollections";
import { useCollectionsStore } from "@/features/collections/store/useCollectionsStore";

export function useRestoredTabsSync() {
  useEffect(() => {
    const handleTabRemoved = (tabId: number) => {
      useCollectionsStore.getState().removeClosedTab(tabId);
    };

    chrome.tabs.onRemoved.addListener(handleTabRemoved);

    void syncRestoredCollections().catch((error: unknown) => {
      console.error("Failed to sync restored collections:", error);
    });

    return () => {
      chrome.tabs.onRemoved.removeListener(handleTabRemoved);
    };
  }, []);
}
