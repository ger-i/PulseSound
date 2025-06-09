// A termékek megjelenítéséért felelős komponensünk a ProductPage.js fájlban található. 
// A termékek megjelenítéséhez szükséges adatokat a props-on keresztül kapja meg, és a megfelelő adatokat megjeleníti a felhasználó számára. 
// A termékek rendezését is lehetővé teszi a felhasználó számára, valamint a termékekre kattintva a megfelelő termék oldalára navigál. 
// A termékek rendezését a useState hook segítségével valósítja meg, ahol a rendezési opciók változtatására a felhasználói interakciók hatással vannak. 
// A termékek rendezését a sortOption változó alapján végzi el, amely a useState hook segítségével kerül beállításra. 
// A termékek rendezését a sort() metódus segítségével végzi el, amely a termékek tömbjét rendezve adja vissza. 
// A termékek rendezéséhez a sort() metódus egy összehasonlító függvényt használ, amely a sortOption változó értékétől függően különböző módon rendez. 

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProductPage.css';

const ProductPage = ({ title, bannerImage, products }) => {
    const [sortOption, setSortOption] = useState('default');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sortProducts = (products, option) => {
        switch (option) {
            case 'name-asc':
                return [...products].sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return [...products].sort((a, b) => b.name.localeCompare(a.name));
            case 'price-asc':
                return [...products].sort((a, b) => a.price - b.price);
            case 'price-desc':
                return [...products].sort((a, b) => b.price - a.price);
            default:
                return products;
        }
    };

    const sortedProducts = sortProducts(products, sortOption);

    const handleCardClick = (productId) => {
        if (productId) {
            navigate(`/product/${productId}`);
        } else {
            console.error('Érvénytelen termék azonosító');
        }
    };

    return (
        <div className="product-page">
            <div className="banner">
                <img src={bannerImage} alt={`${title} termékek bannere`} />
                <div className="banner-text">
                    <h1>{title}</h1>
                </div>
            </div>

            <h1>Fedezze fel termékeinket</h1>
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

            <div className="product-grid">
                {sortedProducts.length > 0 ? (
                    sortedProducts.map((product) => (
                        <div
                            key={product.id}
                            className="product-card"
                            onClick={() => handleCardClick(product.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={product.image} alt={product.name} />
                            <h2>{product.name}</h2>
                            <p>{product.price} Ft</p>
                        </div>
                    ))
                ) : (
                    <p>Jelenleg nincsenek elérhető termékek.</p>
                )}
            </div>
        </div>
    );
};

ProductPage.propTypes = {
    title: PropTypes.string.isRequired,
    bannerImage: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ProductPage;