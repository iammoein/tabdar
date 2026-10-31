import type { Collection } from "@/features/collections/types/collection.types";

export const getCollections = async (): Promise<Collection[]> => {
  const result = await chrome.storage.local.get("collections");
  return (result.collections as Collection[] | undefined) ?? [];
};

export const saveCollections = async (collections: Collection[]):Promise<void> => {
  await chrome.storage.local.set({collections});
};
