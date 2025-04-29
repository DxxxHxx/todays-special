import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import RecommendMapPage from "./page/RecommendMapPage";
import Layout from "./components/common/Layout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<RecommendMapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
