/**
 * ProductPage komponens - Termékek megjelenítéséért felelős komponens
 * 
 * Funkciók:
 * - Termékek listázása kártya formátumban
 * - Banner kép megjelenítése kategória címmel
 * - Termékek rendezése különböző kritériumok szerint
 * - Navigáció az egyes termékek részletes oldalára
 * - Automatikus oldaltetőre görgetés
 * - Üres terméklista kezelése
 * - Reszponzív grid layout
 * 
 * Props:
 * - title: Kategória címe (pl. "Fülhallgatóink")
 * - bannerImage: Banner kép URL
 * - products: Termékek tömbje
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router navigációhoz
import PropTypes from 'prop-types'; // Props validáció
import './ProductPage.css'; // ProductPage specifikus stílusok

/**
 * ProductPage komponens - Termékek megjelenítése és rendezése
 */
const ProductPage = ({ title, bannerImage, products }) => {
    // Állapot változók
    const [sortOption, setSortOption] = useState('default'); // Rendezési opció tárolása
    const navigate = useNavigate(); // Programozott navigáció hook

    /**
     * Komponens mount után az oldal tetejére görget
     * Felhasználói élmény javítása - minden kategória váltásnál tetejére ugrik
     */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    /**
     * Termékek rendezése a kiválasztott opció alapján
     */
    const sortProducts = (products, option) => {
        switch (option) {
            case 'name-asc':
                // Név szerint növekvő (A-Z) - magyar nyelvű összehasonlítás
                return [...products].sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                // Név szerint csökkenő (Z-A) - magyar nyelvű összehasonlítás
                return [...products].sort((a, b) => b.name.localeCompare(a.name));
            case 'price-asc':
                // Ár szerint növekvő - legolcsóbb először
                return [...products].sort((a, b) => a.price - b.price);
            case 'price-desc':
                // Ár szerint csökkenő - legdrágább először
                return [...products].sort((a, b) => b.price - a.price);
            default:
                // Alapértelmezett sorrend - eredeti tömb sorrendje
                return products;
        }
    };

    // Rendezett termékek kiszámítása az aktuális rendezési opció alapján
    const sortedProducts = sortProducts(products, sortOption);

    /**
     * Termék kártya kattintás kezelése
     */
    const handleCardClick = (productId) => {
        if (productId) {
            // Navigáció az adott termék részletes oldalára
            navigate(`/product/${productId}`);
        } else {
            // Hibakezelés érvénytelen termék ID esetén
            console.error('Érvénytelen termék azonosító');
        }
    };

    return (
        <div className="product-page">
            {/* Banner szekció - kategória kép és cím */}
            <div className="banner">
                <img src={bannerImage} alt={`${title} termékek bannere`} />
                <div className="banner-text">
                    <h1>{title}</h1>
                </div>
            </div>

            {/* Főcím a banner alatt */}
            <h1 className="section-title">Fedezze fel termékeinket</h1>

            {/* Rendezési opciók dropdown */}
            <div className="sort-options">
                <label>Rendezés:</label>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="default">Alapértelmezett</option>
                    <option value="name-asc">Név szerint (A-Z)</option>
                    <option value="name-desc">Név szerint (Z-A)</option>
                    <option value="price-asc">Ár szerint növekvő</option>
                    <option value="price-desc">Ár szerint csökkenő</option>
                </select>
            </div>

            {/* Termék grid - termékek megjelenítése */}
            <div className="product-grid">
                {sortedProducts.length > 0 ? (
                    // Termékek iterálása és kártyák létrehozása
                    sortedProducts.map((product) => (
                        <div
                            key={product.id}
                            className="product-card"
                            onClick={() => handleCardClick(product.id)} // Kártya kattintás kezelése
                            style={{ cursor: 'pointer' }} // Kattintható kinézet
                        >
                            {/* Termék kép */}
                            <img src={product.image} alt={product.name} />
                            {/* Termék név */}
                            <h2>{product.name}</h2>
                            {/* Termék ár - magyar formázás (szóközzel, Ft-tal) */}
                            <p>{product.price.toLocaleString('hu-HU')} Ft</p>
                        </div>
                    ))
                ) : (
                    // Üres terméklista esetén megjelenő üzenet
                    <p>Jelenleg nincsenek elérhető termékek.</p>
                )}
            </div>
        </div>
    );
};

/**
 * Props validáció - típusellenőrzés és kötelező mezők definiálása
 * Fejlesztési környezetben figyelmezteti a fejlesztőt helytelen props használat esetén
 */
ProductPage.propTypes = {
    title: PropTypes.string.isRequired,        // Kategória cím - kötelező string
    bannerImage: PropTypes.string.isRequired,  // Banner kép URL - kötelező string
    products: PropTypes.arrayOf(               // Termékek tömbje - kötelező array
        PropTypes.shape({                      // Minden termék objektum struktúrája
            id: PropTypes.number.isRequired,       // Termék ID - kötelező number
            name: PropTypes.string.isRequired,     // Termék név - kötelező string
            price: PropTypes.number.isRequired,    // Termék ár - kötelező number
            image: PropTypes.string.isRequired,    // Termék kép URL - kötelező string
        })
    ).isRequired,
};

export default ProductPage;