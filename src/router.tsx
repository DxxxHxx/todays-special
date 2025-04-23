import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Header from "./components/header/Header";

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
    <div className="p-6">
      {/* <ToggleButton /> */}
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
