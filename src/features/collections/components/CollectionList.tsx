import type {
  Collection,
  CollectionTab,
} from "@/features/collections/types/collection.types";
import CollectionItem from "@/features/collections/components/CollectionItem";

type CollectionListProps = {
  collections: Collection[];
  onRestoreTab: (tabs: CollectionTab[]) => void;
  limit?: number;
};

export default function CollectionList({
  collections,
  onRestoreTab,
  limit,
}: CollectionListProps) {
  const visibleCollections =
    limit === undefined ? collections : collections.slice(0, limit);

  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {visibleCollections.map((collection) => (
        <li key={collection.id}>
          <CollectionItem collection={collection} onRestoreTab={onRestoreTab} />
        </li>
      ))}
    </ul>
  );
}
