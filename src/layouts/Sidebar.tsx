import { NavLink } from "react-router";

import { dashboardNavigation } from "@/dashboard/navigation";
import Icon from "@/shared/components/Icon";

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-8 h-full w-62 px-4.5 py-7 bg-(--surface) border-r border-(--surface-hover)">
      <div className="flex items-center gap-2.75 h-11">
        <img src="/icons/icon48.png" className="size-12" alt="" />
        <div className="flex flex-col">
          <strong className="text-(--text) text-[18px]">Tabdar</strong>
          <small className="text-(--secondary) text-[11px]">
            Manage your browser tabs
          </small>
        </div>
      </div>

      <nav className="w-full">
        <ul className="flex flex-col gap-1.5">
          {dashboardNavigation.map((link) => (
            <li key={link.to} className="w-full">
              <NavLink
                className={({ isActive }) =>
                  `group flex items-center gap-1.5 w-full h-14 px-1.75 py-2.5 rounded-(--r-md) hover:translate-x-0.5 transition-transform duration-250 ${
                    isActive
                      ? " bg-(--primary-soft)"
                      : "bg-transparent hover:bg-(--surface-hover)"
                  }`
                }
                to={link.to}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex items-center justify-center size-8.5 rounded-(--r-sm) border  transition-colors duration-250 ${isActive ? "bg-(--primary) border-(--primary) text-(--on-primary) shadow-[0_4px_10px_rgb(71_118_208/20%)]" : "bg-(--elevated) border-(--border) text-(--secondary) group-hover:border-(--primary) group-hover:text-(--primary)"}`}
                    >
                      <Icon name={link.icon} />
                    </span>

                    <div className="flex flex-col justify-between">
                      <strong className="text-(--primary) text-[11px]">
                        {link.label}
                      </strong>
                      <small className="text-(--muted) text-[11px]">
                        {link.description}
                      </small>
                    </div>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
