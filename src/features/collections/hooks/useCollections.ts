import type { Collection } from "@/features/collections/types/collection.types";
import {
  getCollections,
  removeCollection,
  saveCollections,
} from "@/services/browser/collections";
import { useEffect, useState } from "react";

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

  const handleRemoveCollection = async (collectionId: string) => {
    await removeCollection(collectionId);

    setCollections((collections) => {
      const nextCollections = [...collections];
      return nextCollections.filter(
        (collection) => collection.id !== collectionId,
      );
    });
  };

  return {
    collections,
    handleSaveCollection,
    handleRemoveCollection,
  };
}
