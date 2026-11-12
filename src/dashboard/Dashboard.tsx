import { Outlet } from "react-router";

import Header from "@/layouts/Header";
import Sidebar from "@/layouts/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header tabsLength={23} windowsLength={2} />
        <main className="min-h-0 flex-1 overflow-y-auto bg-(--background) px-11 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
