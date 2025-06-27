import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import { Toaster } from "sonner";
import { useTheme } from "../theme/themeProvider";
import { Analytics } from "@vercel/analytics/react";

const Layout = () => {
  const { theme } = useTheme();
  return (
    <div className="p-6">
      <Header />
      <main>
        <Outlet />
        <Toaster theme={theme as "light" | "dark"} />
        <Analytics />
      </main>
    </div>
  );
};
export default Layout;
