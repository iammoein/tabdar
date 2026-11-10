import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Themes = "light" | "dark" | "system";

const isTheme = (value: unknown): value is Themes =>
  value === "light" || value === "dark" || value === "system";

export type ThemeContext = {
  theme: Themes;
  setTheme: (theme: Themes) => void;
};

const ThemeContext = createContext<ThemeContext>({
  theme: "system",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Themes>("system");

  const saveTheme = (nextTheme: Themes) => {
    setThemeState(nextTheme);
    void chrome.storage.local.set({theme: nextTheme})
  };

  useEffect(() => {
    const loadTheme = async () => {
      const result = await chrome.storage.local.get("theme");

      const savedTheme = result.theme;

      setThemeState(isTheme(savedTheme) ? savedTheme : "system");
    };

    void loadTheme();
  }, []);

  useEffect(() => {
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const isDark =
        theme === "dark" || (theme === "system" && colorScheme.matches);
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light",
      );
    };

    applyTheme();

    if (theme === "system") {
      colorScheme.addEventListener("change", applyTheme);
      return () => colorScheme.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  return <ThemeContext value={{ theme, setTheme:saveTheme }}>{children}</ThemeContext>;
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
