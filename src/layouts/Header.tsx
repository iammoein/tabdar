import { useTheme, type Themes } from "@/shared/theme/ThemeProvider";
import Button from "@/shared/components/Button";

type HeadersProps = {
  tabsLength: number;
  windowsLength: number;
};

const themes = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
] satisfies { label: string; value: Themes }[];

export default function Headers({ tabsLength, windowsLength }: HeadersProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className=" flex items-center justify-between w-full h-17 px-10.5 bg-(--surface) border-b border-(--surface-hover) z-10">
      <div className="text-(--secondary)">
        {tabsLength} tabs open acroos {windowsLength} windows
      </div>

      <ul className="flex items-center gap-0.5 p-0.75 bg-(--elevated) border border-(--border) rounded-lg">
        {themes.map((option) => (
          <li key={option.value}>
            <Button
              className={`p-2 ${option.value === theme ? "is-selected" : ""}`}
              variant="none"
              onClick={() => setTheme(option.value)}
            >
              {option.label}
            </Button>
          </li>
        ))}
      </ul>
    </header>
  );
}
