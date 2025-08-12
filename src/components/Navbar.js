/**
 * Navbar komponens - Navigációs sáv a weboldal tetején
 * 
 * Funkciók:
 * - Logo és főoldal link
 * - Keresősáv élő keresési javaslatokkal
 * - Kosár ikon számláló badge-dzsel
 * - Reszponzív hamburger menü
 * - Kategória navigációs linkek
 * - Aktív oldal jelölés
 */

import React, { useState, useContext, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // React Router navigációs komponensek
import Logo from '../images/logo_1.png'; 
import CartContext from '../components/CartContext'; // Kosár állapot kezelés
import ProductsData from '../components/ProductsData'; // Termékadatok kereséshez
import './Navbar.css'; // 

/**
 * Keresés ikon SVG komponens
 */
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 50 50">
    <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
  </svg>
);

/**
 * Kosár ikon SVG komponens
 */
const CartIcon = () => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
  </svg>
);

/**
 * Nav komponens - Fő navigációs sáv
 */
const Nav = () => {
  // Állapot változók
  const [menuOpen, setMenuOpen] = useState(false); // Hamburger menü nyitva/zárva állapot
  const [searchTerm, setSearchTerm] = useState(''); // Keresőmező aktuális értéke
  const [searchResults, setSearchResults] = useState([]); // Keresési eredmények tömbje
  
  // Context és hook-ok
  const { getCartCount } = useContext(CartContext); // Kosár tételek számának lekérdezése
  const navigate = useNavigate(); // Programozott navigáció

  /**
   * Hamburger menü megnyitása/bezárása
   */
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  /**
   * Keresőmező érték változás kezelése
   * useCallback optimalizáció a felesleges újrarenderelések elkerülésére
   */
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Üres keresés esetén törli az eredményeket
    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    // Termékek szűrése név alapján (case-insensitive)
    const results = ProductsData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 10); // Eredmények limitálása 10 elemre
    
    setSearchResults(results);
  }, []);

  /**
   * Keresési javaslat kiválasztása
   */
  const handleSearchSelect = (product) => {
    navigate(`/product/${product.id}`); // Navigáció a termék oldalra
    setSearchTerm(''); // Keresőmező törlése
    setSearchResults([]); // Javaslatok törlése
  };

  return (
    <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
      {/* Logo és főoldal link */}
      <NavLink to="/" className="logo">
        <img src={Logo} alt="logo" />
      </NavLink>

      {/* Keresősáv konténer */}
      <div className="search-bar-container">
        {/* Kereső form */}
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Keresés..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit">
            <SearchIcon />
          </button>
        </form>
        
        {/* Keresési javaslatok dropdown */}
        {searchResults.length > 0 && (
          <ul className="search-suggestions">
            {searchResults.map((product) => (
              <li key={product.id} onClick={() => handleSearchSelect(product)}>
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Ikonok konténer (kosár) */}
      <div className="icon-container">
        <NavLink to="/cart" className="icon cart-icon">
          <CartIcon />
          {/* Kosár számláló badge - csak ha van elem a kosárban */}
          {getCartCount() > 0 && <span className="cart-count">{getCartCount()}</span>}
        </NavLink>
      </div>

      {/* Hamburger menü ikon (mobil) */}
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div> {/* Hamburger vonal 1 */}
        <div className="bar"></div> {/* Hamburger vonal 2 */}
        <div className="bar"></div> {/* Hamburger vonal 3 */}
      </div>

      {/* Navigációs linkek */}
      <ul className={`nav-links ${menuOpen ? 'visible' : ''}`}>
        {/* Főoldal link */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")} // Aktív oldal CSS osztály
            onClick={toggleMenu} // Mobil menü bezárása kattintásra
          >
            Főoldal
          </NavLink>
        </li>
        
        {/* Fülhallgatók kategória */}
        <li>
          <NavLink
            to="/Earbuds"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={toggleMenu}
          >
            Fülhallgatók
          </NavLink>
        </li>
        
        {/* Fejhallgatók kategória */}
        <li>
          <NavLink
            to="/Headphones"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={toggleMenu}
          >
            Fejhallgatók
          </NavLink>
        </li>
        
        {/* Hangszórók kategória */}
        <li>
          <NavLink
            to="/Speakers"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={toggleMenu}
          >
            Hangszórók
          </NavLink>
        </li>
        
        {/* Mikrofonok kategória */}
        <li>
          <NavLink
            to="/Microphones"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={toggleMenu}
          >
            Mikrofonok
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;