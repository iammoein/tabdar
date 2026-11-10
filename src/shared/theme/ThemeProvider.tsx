import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Themes = "light" | "dark" | "system";

export type ThemeContext = {
  theme: Themes;
  setTheme: (theme: Themes) => void;
};

const ThemeContext = createContext<ThemeContext>({
  theme: "system",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Themes>("system");

  useEffect(() => {
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const isDark = theme === "dark" || (theme === "system" && colorScheme.matches);
      document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    };

    applyTheme();

    if (theme === "system") {
      colorScheme.addEventListener("change", applyTheme);
      return () => colorScheme.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
