import type { IconName } from "@/shared/components/Icon";

type DashboardNavigationItem = {
  to: string;
  label: string;
  icon: IconName;
  description: string;
  end?: boolean;
};

export const dashboardNavigation = [
  {
    to: "/",
    label: "Home",
    icon: "tabs",
    description: "Manage this session",
    end: true,
  },
  {
    to: "/collections",
    label: "Collections",
    icon: "archive",
    description: "Restore saved tabs",
  },
  {
    to: "/insight",
    label: "Insight",
    icon: "chart",
    description: "Browsing patterns",
  },
] as const satisfies readonly DashboardNavigationItem[];
