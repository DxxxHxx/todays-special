import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "./themeProvider";

export default function ToggleButton() {
  const { setTheme, theme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <Button onClick={handleThemeToggle}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
