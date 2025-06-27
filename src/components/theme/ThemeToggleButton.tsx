import { useTheme } from "./themeProvider";
import { Switch } from "../ui/switch";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleButton() {
  const { setTheme, theme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="flex items-center space-x-2 ">
      <label
        aria-label="to light mode"
        htmlFor="theme"
        className="cursor-pointer"
      >
        <Sun />
      </label>
      <Switch
        aria-label="toggle theme button"
        onClick={handleThemeToggle}
        id="theme"
        className="cursor-pointer"
        aria-checked={theme === "dark" ? "true" : "false"}
        checked={theme === "dark"}
      />
      <label
        aria-label="to dark mode"
        htmlFor="theme"
        className="cursor-pointer"
      >
        <Moon />
      </label>
    </div>
  );
}
