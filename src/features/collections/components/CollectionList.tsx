import { useState } from "react";

import CollectionItem from "@/features/collections/components/CollectionItem";
import RenameCollectionModal from "@/features/collections/components/RenameCollectionModal";
import type {
  Collection,
  CollectionTab,
} from "@/features/collections/types/collection.types";

type CollectionListProps = {
  collections: Collection[];
  onRestoreTab: (tabs: CollectionTab[]) => void;
  onRenameCollection: (id: string, newTitle: string) => void;
  onDeleteCollection: (id: string) => void;
  onDuplicationCollection: (id: string) => void;
  limit?: number;
};

export default function CollectionList({
  collections,
  onRestoreTab,
  onRenameCollection,
  onDeleteCollection,
  onDuplicationCollection,
  limit,
}: CollectionListProps) {
  const [openMenuCollectionId, setOpenMenuCollectionId] = useState<
    null | string
  >(null);
  const [isRenameCollection, setIsRenameCollection] =
    useState<null | Collection>(null);

  const visibleCollections =
    limit === undefined ? collections : collections.slice(0, limit);

  const toggleMenu = (id: string) => {
    setOpenMenuCollectionId((currentId) => (currentId === id ? null : id));
  };

  const handleRename = (id: string) => {
    const renameCollection = collections.find(
      (collection) => collection.id === id,
    );

    if (!renameCollection) return;

    setIsRenameCollection(renameCollection);
  };

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {visibleCollections.map((collection) => (
          <li key={collection.id}>
            <CollectionItem
              collection={collection}
              onRestoreTab={onRestoreTab}
              onToggleMenu={toggleMenu}
              onDelete={onDeleteCollection}
              onRename={handleRename}
              onDuplicate={onDuplicationCollection}
              isOpenMenu={collection.id === openMenuCollectionId}
            />
          </li>
        ))}
      </ul>

      {isRenameCollection && (
        <RenameCollectionModal
          currentName={isRenameCollection.title}
          onSave={(newTitle) =>
            onRenameCollection(isRenameCollection.id, newTitle)
          }
          onClose={() => setIsRenameCollection(null)}
        />
      )}
    </>
  );
}
