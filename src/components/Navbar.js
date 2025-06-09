// Komponensünk a navigációs sávot valósítja meg, amely a főoldalra, a termékek kategóriáira és a kosárba vezető linkeket tartalmazza.
// A kereső mezőt is itt helyezzük el, amely a termékek nevében keres.
// A keresési eredményeket egy listában jelenítjük meg, amelyekre kattintva a megfelelő termék oldalára navigálunk.
// A kereső mezőbe írt szöveg alapján a termékek nevében keresünk, és a találatokat jelenítjük meg.
// A keresési eredményekre kattintva a megfelelő termék oldalára navigálunk.

import React, { useState, useContext, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../images/logo_1.png';
import CartContext from '../components/CartContext';
import ProductsData from '../components/ProductsData';
import './Navbar.css';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 50 50">
    <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
  </svg>
);

const CartIcon = () => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
  </svg>
);

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { getCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = ProductsData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 10); // Limit results to 10 items
    setSearchResults(results);
  }, []);

  const handleSearchSelect = (product) => {
    navigate(`/product/${product.id}`);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
      <NavLink to="/" className="logo">
        <img src={Logo} alt="logo" />
      </NavLink>

      <div className="search-bar-container">
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

      <div className="icon-container">
        <NavLink to="/cart" className="icon cart-icon">
          <CartIcon />
          {getCartCount() > 0 && <span className="cart-count">{getCartCount()}</span>}
        </NavLink>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className={`nav-links ${menuOpen ? 'visible' : ''}`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={toggleMenu}
          >
            Főoldal
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Earbuds"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={toggleMenu}
          >
            Füllhallgatók
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Headphones"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={toggleMenu}
          >
            Fejhallgatók
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Speakers"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={toggleMenu}
          >
            Hangszórók
          </NavLink>
        </li>
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