import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import RecommendMapPage from "./page/RecommendMapPage";
import Layout from "./components/common/Layout";
import HistoryPage from "./page/HistoryPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import MyPage from "./page/MyPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/map" element={<RecommendMapPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/myPage" element={<MyPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
