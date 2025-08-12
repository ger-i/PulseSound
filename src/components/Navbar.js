import React, { useState, useContext, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../images/logo_1.png';
import CartContext from '../components/CartContext';
import ProductsData from '../components/ProductsData';

// Kereső ikon SVG – fekete színnel
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 50 50">
    <path fill="black" d="..." />
  </svg>
);

// Kosár ikon SVG – fekete színnel
const CartIcon = ({ className }) => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={className} >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" /> </svg>
);

// Fő navigációs komponens
const Nav = () => {
  // Állapotkezelés
  const [menuOpen, setMenuOpen] = useState(false); // Mobil menü nyitva/zárva
  const [searchTerm, setSearchTerm] = useState(''); // Keresőmező értéke
  const [searchResults, setSearchResults] = useState([]); // Keresési javaslatok
  const { getCartCount } = useContext(CartContext); // Kosárban lévő termékek száma
  const navigate = useNavigate(); // Navigáció termékoldalra

  // Hamburger menü nyitása/zárása
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Keresőmező változás kezelése
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Termékek szűrése név alapján (kisbetűs összehasonlítás)
    const results = ProductsData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 10); // Maximum 10 találat
    setSearchResults(results);
  }, []);

  // Keresési javaslat kiválasztása
  const handleSearchSelect = (product) => {
    navigate(`/product/${product.id}`);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    // Navigációs sáv konténer
    <nav className="flex items-center justify-between bg-gray-200 relative z-50 p-4">

      {/* Logó – főoldalra navigál */}
      <NavLink to="/" className="flex">
        <img src={Logo} alt="logo" className="max-w-[120px] sm:w-[140px] h-auto" />
      </NavLink>

      {/* Asztali navigációs linkek */}
      <div className="hidden md:flex flex-1 justify-center space-x-8 mx-8">
        {[
          { path: '/', label: 'Főoldal' },
          { path: '/Earbuds', label: 'Fülhallgatók' },
          { path: '/Headphones', label: 'Fejhallgatók' },
          { path: '/Speakers', label: 'Hangszórók' },
          { path: '/Microphones', label: 'Mikrofonok' }
        ].map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `text-black no-underline text-lg font-bold hover:text-blue-600 ${isActive ? 'text-purple-600' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Jobb oldali elemek: kereső, kosár, hamburger */}
      <div className="flex items-center space-x-4">

        {/* Keresősáv */}
        <div className="relative">
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Keresés..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-2 py-1 border border-gray-300 rounded-l-md outline-none w-36 sm:w-56 text-black"
            />
            <button type="submit" className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded-r-md">
              <SearchIcon />
            </button>
          </form>

          {/* Keresési javaslatok dropdown */}
          {searchResults.length > 0 && (
            <ul className="absolute top-full left-0 w-full max-h-48 bg-white border border-gray-300 rounded-b-md list-none m-0 p-0 z-10 overflow-y-auto shadow-md">
              {searchResults.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleSearchSelect(product)}
                  className="px-3 py-2 cursor-pointer transition duration-300 text-sm hover:bg-gray-100 text-black"
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Kosár ikon badge-dzsel */}
        <div className="relative">
          <NavLink to="/cart" className="text-black hover:text-blue-600 transition duration-300">
            <CartIcon className="w-8 h-8" />
            {getCartCount() > 0 && (
              <span className="absolute flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 top-0 right-0 transform translate-x-1/2 -translate-y-1/2 shadow-sm">
                {getCartCount()}
              </span>
            )}
          </NavLink>
        </div>

        {/* Hamburger ikon (mobil) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 ml-4"
          onClick={toggleMenu}
        >
          <div className={`w-6 h-0.5 bg-black my-0.5 transition-all duration-300 ${menuOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-black my-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-black my-0.5 transition-all duration-300 ${menuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>
      </div>

      {/* Mobil navigációs menü */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 shadow-md z-40">
          <ul className="flex flex-col list-none p-4 space-y-4 justify-center items-center">
            {[
              { path: '/', label: 'Főoldal' },
              { path: '/Earbuds', label: 'Fülhallgatók' },
              { path: '/Headphones', label: 'Fejhallgatók' },
              { path: '/Speakers', label: 'Hangszórók' },
              { path: '/Microphones', label: 'Mikrofonok' }
            ].map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `block text-white no-underline text-lg font-bold hover:text-blue-300 ${isActive ? 'text-purple-300' : ''}`
                  }
                  onClick={toggleMenu}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;