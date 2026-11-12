import { useState } from "react";

import CollectionItem from "@/features/collections/components/CollectionItem";
import type {
  Collection,
  CollectionTab,
} from "@/features/collections/types/collection.types";

type CollectionListProps = {
  collections: Collection[];
  onRestoreTab: (tabs: CollectionTab[]) => void;
  onRemoveCollection: (id: string) => void;
  limit?: number;
};

export default function CollectionList({
  collections,
  onRestoreTab,
  onRemoveCollection,
  limit,
}: CollectionListProps) {
  const [openMenuCollectionId, setOpenMenuCollectionId] = useState<
    null | string
  >(null);

  const toggleMenu = (id: string) => {
    setOpenMenuCollectionId((currentId) => (currentId === id ? null : id));
  };

  const visibleCollections =
    limit === undefined ? collections : collections.slice(0, limit);

  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {visibleCollections.map((collection) => (
        <li key={collection.id}>
          <CollectionItem
            collection={collection}
            onRestoreTab={onRestoreTab}
            onToggleMenu={toggleMenu}
            onDelete={onRemoveCollection}
            isOpenMenu={collection.id === openMenuCollectionId}
          />
        </li>
      ))}
    </ul>
  );
}
