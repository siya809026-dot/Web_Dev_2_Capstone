import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/layout/Navbar";

// Lazy loading pages — performance optimization
const Home = lazy(() => import("./pages/Home/Home"));
const Players = lazy(() => import("./pages/Players/Players"));
const PlayerDetail = lazy(() => import("./pages/Players/PlayerDetail"));
const Teams = lazy(() => import("./pages/Teams/Teams"));
const Matches = lazy(() => import("./pages/Matches/Matches"));
const Compare = lazy(() => import("./pages/Compare/Compare"));
const Favourites = lazy(() => import("./pages/Favourites/Favourites"));

function AppInner() {
  const darkMode = useSelector((s) => s.ui.darkMode);

  return (
    <div className={darkMode ? "" : "light"}>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<div style={{ padding: "40px", textAlign: "center", color: "var(--text2)" }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<Players />} />
            <Route path="/players/:id" element={<PlayerDetail />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="*" element={
              <div style={{ padding: "60px", textAlign: "center" }}>
                <h2 style={{ fontFamily: "Bebas Neue, cursive", fontSize: 40 }}>404 — PAGE NOT FOUND</h2>
                <a href="/" style={{ color: "var(--accent)" }}>Go home</a>
              </div>
            } />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default AppInner;
