import { useEffect } from "react";
import { Outlet } from "react-router";

import { initTabsStore } from "@/features/tabs/store/initTabsStore";
import { useTabsStore } from "@/features/tabs/store/useTabsStore";
import Header from "@/layouts/Header";
import Sidebar from "@/layouts/Sidebar";

export default function Dashboard() {
  useEffect(() => initTabsStore(), []);

  const tabs = useTabsStore((state) => state.tabs);
  const windows = useTabsStore((state) => state.windows);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header tabsLength={tabs.length} windowsLength={windows.length} />
        <main className="min-h-0 flex-1 overflow-y-auto bg-(--background) px-11 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
