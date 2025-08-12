/**
 * NavFoot komponens - Layout wrapper komponens
 * 
 * Funkciók:
 * - Közös layout struktúra biztosítása az összes oldalhoz
 * - Navbar megjelenítése az oldal tetején
 * - Footer megjelenítése az oldal alján
 * - Dinamikus tartalom renderelése a középső részben (Outlet)
 * - React Router nested routing támogatás
 */

// Közös layout komponensek importálása
import Navbar from "../components/Navbar";  // Navigációs sáv komponens
import Footer from "../components/Footer";  // Lábléc komponens
import { Outlet } from "react-router-dom"; // React Router outlet a nested route-okhoz

/**
 * NavFoot komponens - Közös layout struktúra
 * 
 * Ez a komponens szolgál az alkalmazás fő layout-jaként, amely minden oldalon
 * megjelenik. A React Router Outlet segítségével a különböző route-ok
 * tartalma dinamikusan renderelődik a Navbar és Footer között.
 * 
 * Layout struktúra:
 * - Tetején: Navigációs sáv (logo, menü, keresés, kosár)
 * - Középen: Dinamikus tartalom (aktuális route komponense)
 * - Alján: Lábléc (linkek, copyright információk)
 */
const NavFoot = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default NavFoot;