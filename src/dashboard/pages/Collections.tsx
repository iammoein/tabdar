import type { CollectionTab } from "@/features/collections/types/collection.types";
import { restoreTabs } from "@/services/browser/tabs";
import CollectionList from "@/features/collections/components/CollectionList";
import useCollections from "@/features/collections/hooks/useCollections";

export default function Collections() {
  const { collections } = useCollections();

  const handleRestoreTab = async (tabs: CollectionTab[]) => {
    await restoreTabs(tabs);
  };

  return (
    <CollectionList collections={collections} onRestoreTab={handleRestoreTab} />
  );
}
