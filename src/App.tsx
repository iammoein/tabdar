import Checkbox from "@/shared/components/Checkbox";
import useBrowserTabs from "@/features/tabs/hooks/useBrowserTabs";
import BrowserTabList from "@/features/tabs/components/BrowserTabList";

export default function App() {
  const {
    tabs,
    windows,
    selectedTabIds,
    allTabsSelected,
    handleSelectAllTabs,
    handleSelectTab,
  } = useBrowserTabs();

  return (
    <main className="flex flex-col min-h-screen min-w-75 p-4.5 bg-(--popup-background)">
      <div className="flex justify-between items-center w-full h-11 py-3 px-3.5 bg-[#262933] border border-(--border) rounded-(--r-md)">
        <strong>{tabs.length} tab open</strong>
        <small>Open in {windows.length} window</small>
      </div>
      <label className="w-full flex justify-between items-center mt-4.75 mb-2.25">
        <div className="flex items-center gap-2">
          <strong>Select All Tabs</strong>
          <Checkbox checked={allTabsSelected} onChange={handleSelectAllTabs} />
        </div>

        <small className="text-(--primary)">
          selected {selectedTabIds.size}
        </small>
      </label>
      <BrowserTabList
        tabs={tabs}
        selectedTabIds={selectedTabIds}
        handleSelectTab={handleSelectTab}
      />
    </main>
  );
}
