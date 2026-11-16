import { create } from "zustand";

import { getBrowserTabs, getBrowserWindows } from "@/services/browser/tabs";

type TabsState = {
  tabs: chrome.tabs.Tab[];
  windows: chrome.windows.Window[];
  selectedTabIds: Set<number>;
  fetchTabs: () => Promise<void>;
  fetchWindows: () => Promise<void>;
  removeTab: (tabId: number) => void;
  selectTab: (id: number | undefined, checked: boolean) => void;
  selectAllTabs: (tabs: chrome.tabs.Tab[], checked: boolean) => void;
  clearSelectedTabs: () => void;
};

export const useTabsStore = create<TabsState>()((set) => ({
  tabs: [],
  windows: [],
  selectedTabIds: new Set(),

  fetchTabs: async () => {
    try {
      const tabs = await getBrowserTabs();
      set({ tabs });
    } catch (error) {
      console.error(error);
    }
  },

  fetchWindows: async () => {
    try {
      const windows = await getBrowserWindows();
      set({ windows });
    } catch (error) {
      console.error(error);
    }
  },

  removeTab: (tabId) => {
    set((state) => ({
      tabs: state.tabs.filter((tab) => tab.id !== tabId),
      selectedTabIds: new Set(
        [...state.selectedTabIds].filter((id) => id !== tabId),
      ),
    }));
  },

  selectTab: (id, checked) => {
    if (id === undefined) return;

    set((state) => {
      const next = new Set(state.selectedTabIds);

      if (checked) next.add(id);
      else next.delete(id);

      return { selectedTabIds: next };
    });
  },

  selectAllTabs: (tabs, checked) => {
    set((state) => {
      const next = new Set(state.selectedTabIds);

      tabs.forEach((tab) => {
        if (tab.id === undefined) return;

        if (checked) next.add(tab.id);
        else next.delete(tab.id);
      });

      return { selectedTabIds: next };
    });
  },

  clearSelectedTabs: () => {
    set({ selectedTabIds: new Set() });
  },
}));
