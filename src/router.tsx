import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ToggleButton from "./components/theme/toggleButton";
import Home from "./page/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const Layout = () => {
  return (
    <div>
      <ToggleButton />
      <Outlet />
    </div>
  );
};
