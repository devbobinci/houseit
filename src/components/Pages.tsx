import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../pages/Home";
import Sell from "../pages/Sell";
import Buy from "../pages/Buy";
import EstatePage from "../pages/EstatePage";
import Listings from "../pages/Listings";
import Favorites from "../pages/Favorites";

export default function Pages() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/buy/house/:id" element={<EstatePage />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/listings/:id" element={<Listings />} />
        <Route path="/favorites/:id" element={<Favorites />} />
      </Routes>
    </AnimatePresence>
  );
}
