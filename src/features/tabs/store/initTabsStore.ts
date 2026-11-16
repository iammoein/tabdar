import { useTabsStore } from "@/features/tabs/store/useTabsStore";

export const initTabsStore = () => {
  const { removeTab, fetchTabs, fetchWindows } = useTabsStore.getState();

  fetchTabs();
  fetchWindows();

  const handleTabRemoved = (tabId: number) => removeTab(tabId);

  chrome.tabs.onRemoved.addListener(handleTabRemoved);

  return () => {
    chrome.tabs.onRemoved.removeListener(handleTabRemoved);
  };
};
