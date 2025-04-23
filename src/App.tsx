import { ThemeProvider } from "./components/theme/themeProvider";
import Router from "./router";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router />
    </ThemeProvider>
  );
}
