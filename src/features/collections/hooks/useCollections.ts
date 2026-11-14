import { useEffect, useState } from "react";

import type { Collection } from "@/features/collections/types/collection.types";
import {
  getCollections,
  removeCollection,
  saveCollections,
} from "@/services/browser/collections";

export default function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const browserCollections = await getCollections();
      setCollections(browserCollections);
    };

    fetchCollections();
  }, []);

  const handleSaveCollection = async (newCollection: Collection) => {
    const updatedCollections = [...collections, newCollection];

    setCollections(updatedCollections);
    await saveCollections(updatedCollections);
  };

  const handleRenameCollection = async (
    collectionId: string,
    newTitle: string,
  ) => {
    const updatedCollections = collections.map((collection) => {
      if (collection.id === collectionId) {
        return {
          ...collection,
          title: newTitle,
        };
      }

      return collection;
    });

    await saveCollections(updatedCollections);
    setCollections(updatedCollections);
  };

  const handleDuplicateCollection = async (collectionId: string) => {
    const index = collections.findIndex(
      (collection) => collection.id === collectionId,
    );
    if (index === -1) return collections;

    const copy = {
      ...collections[index],
      id: crypto.randomUUID(),
      title: `${collections[index].title} Copy`,
      tabs: collections[index].tabs.map((tab) => ({ ...tab })),
      createdAt: new Date().toISOString(),
    };

    const duplicatedCollection: Collection[] = [
      ...collections.slice(0, index + 1),
      copy,
      ...collections.slice(index + 1),
    ];

    await saveCollections(duplicatedCollection);
    setCollections(duplicatedCollection);
  };

  const handleDeleteCollection = async (collectionId: string) => {
    await removeCollection(collectionId);

    setCollections((collections) => {
      const nextCollections = [...collections];
      return nextCollections.filter(
        (collection) => collection.id !== collectionId,
      );
    });
  };

  useEffect(() => {
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string,
    ) => {
      if (areaName === "local" && changes.collections) {
        const updatedCollections = changes.collections.newValue as Collection[];

        setCollections(updatedCollections);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, []);

  return {
    collections,
    handleRenameCollection,
    handleSaveCollection,
    handleDeleteCollection,
    handleDuplicateCollection,
  };
}
