import { create } from "zustand";

type CollectionState = {
  restoredCollections: Record<string, number[]>;
  addRestoredTabs: (collectionId: string, tabIds: number[]) => void;
  removeRestoredTabs: (collectionId: string) => void;
};

export const useCollectionsStore = create<CollectionState>((set) => ({
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
}));
