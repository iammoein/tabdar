import type { Collection } from "@/features/collections/types/collection.types";
import { getCollections, saveCollections } from "@/services/browser/collections";
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

  return {
    collections,
    handleSaveCollection,
  };
}
