import { useCollectionsStore } from "@/features/collections/store/useCollectionsStore";
import { getAllTabs } from "@/services/browser/tabs";

export default async function syncRestoredCollections() {
  const allTabs = await getAllTabs();

  const tabIds = new Set(
    allTabs.flatMap((tab) => (tab.id !== undefined ? [tab.id] : [])),
  );

  const restoredCollections =
    useCollectionsStore.getState().restoredCollections;

  const availableCollections = Object.fromEntries(
    Object.entries(restoredCollections)
      .map(([collectionId, ids]) => [
        collectionId,
        ids.filter((id) => tabIds.has(id)),
      ])
      .filter(([, ids]) => ids.length > 0),
  );

  useCollectionsStore.setState({
    restoredCollections: availableCollections,
  });
}
