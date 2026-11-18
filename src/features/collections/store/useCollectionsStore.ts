import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { chromeSessionStorage } from "@/services/browser/sessionStorage";

type CollectionState = {
  restoredCollections: Record<string, number[]>;
  addRestoredTabs: (collectionId: string, tabIds: number[]) => void;
  removeRestoredTabs: (collectionId: string) => void;
};

const STORAGE_KEY = "restoredCollections";

export const useCollectionsStore = create<CollectionState>()(
  persist(
    (set) => ({
      restoredCollections: {},
      addRestoredTabs: (collectionId, tabIds) =>
        set((state) => ({
          restoredCollections: {
            ...state.restoredCollections,
            [collectionId]: [
              ...(state.restoredCollections[collectionId] ?? []),
              ...tabIds,
            ],
          },
        })),
      removeRestoredTabs: (collectionId) =>
        set((state) => {
          const updated = { ...state.restoredCollections };
          delete updated[collectionId];
          return { restoredCollections: updated };
        }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => chromeSessionStorage),
      partialize: (state) => ({
        restoredCollections: state.restoredCollections,
      }),
    },
  ),
);

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "session" && changes[STORAGE_KEY]) {
    useCollectionsStore.persist.rehydrate();
  }
});
