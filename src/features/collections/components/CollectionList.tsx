import { useState } from "react";

import CollectionItem from "@/features/collections/components/CollectionItem";
import RenameCollectionModal from "@/features/collections/components/RenameCollectionModal";
import type {
  Collection,
  CollectionTab,
} from "@/features/collections/types/collection.types";

type CollectionListProps = {
  collections: Collection[];
  restoredCollections: Record<string, number[]>;
  onRestoreTab: (id: string, tabs: CollectionTab[]) => void;
  onCloseTab: (id: string) => void;
  onRenameCollection: (id: string, newTitle: string) => void;
  onDeleteCollection: (id: string) => void;
  onDuplicationCollection: (id: string) => void;
  limit?: number;
};

export default function CollectionList({
  collections,
  restoredCollections,
  onRestoreTab,
  onCloseTab,
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
        {visibleCollections.map((collection) => {
          const isCloseBtn =
            (restoredCollections[collection.id]?.length ?? 0) > 0;

          return (
            <li key={collection.id}>
              <CollectionItem
                collection={collection}
                isCloseBtn={isCloseBtn}
                onRestoreTab={onRestoreTab}
                onCloseTab={() => onCloseTab(collection.id)}
                onToggleMenu={toggleMenu}
                onDelete={onDeleteCollection}
                onRename={handleRename}
                onDuplicate={onDuplicationCollection}
                isOpenMenu={collection.id === openMenuCollectionId}
              />
            </li>
          );
        })}
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
