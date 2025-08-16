import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductPage = ({ title, bannerImage, products }) => { 
    const [sortOption, setSortOption] = useState('default'); // rendezési opció state
    const navigate = useNavigate();

    useEffect(() => {
        // amikor az oldal betölt, az ablak tetejére görget
        window.scrollTo(0, 0);
    }, []);

    // Rendezési logika különböző opciókra
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
                return products; // alapértelmezett: nincs rendezés
        }
    };

    const sortedProducts = sortProducts(products, sortOption);

    // Ha egy kártyára kattintanak → átirányít a termékoldalra
    const handleCardClick = (productId) => {
        if (productId) {
            navigate(`/product/${productId}`);
        } else {
            console.error('Érvénytelen termék azonosító');
        }
    };

    return (
        <div className="text-center font-sans">
            {/* Banner szekció */}
            <div className="relative text-[#25cacf]">
                <img src={bannerImage} alt={`${title} termékek bannere`} className="w-full h-auto" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-shadow">
                    <h1 className="text-[2.5rem] sm:text-[3.5rem] font-bold drop-shadow-lg">{title}</h1>
                </div>
            </div>

            {/* Főcím */}
            <h1 className="text-[1.8rem] sm:text-[2rem] mt-5 font-semibold">Fedezze fel termékeinket</h1>

            {/* Rendezési opciók dropdown */}
            <div className="text-left mb-5 ml-5">
                <label className="font-bold mr-2">Rendezés:</label>
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)} // ha változik → frissül a rendezés
                    className="px-2 py-1 text-base border border-gray-300 rounded"
                >
                    <option value="default">Alapértelmezett</option>
                    <option value="name-asc">Név szerint (A-Z)</option>
                    <option value="name-desc">Név szerint (Z-A)</option>
                    <option value="price-asc">Ár szerint növekvő</option>
                    <option value="price-desc">Ár szerint csökkenő</option>
                </select>
            </div>

            {/* Termék grid megjelenítés */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 px-5 pb-10">
                {sortedProducts.length > 0 ? (
                    sortedProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleCardClick(product.id)} // kattintás → átirányítás
                            className="border border-gray-300 rounded-lg p-3 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-xl"
                        >
                            {/* Termékkép */}
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-[10rem] sm:w-[14rem] h-[10rem] sm:h-[14rem] object-contain mx-auto mb-3"
                            />
                            {/* Terméknév */}
                            <h2 className="text-lg sm:text-xl font-semibold my-5">{product.name}</h2>
                            {/* Ár */}
                            <p className="text-gray-600 font-bold">{product.price.toLocaleString('hu-HU')} Ft</p>
                        </div>
                    ))
                ) : (
                    // Ha nincs termék
                    <p className="text-lg text-gray-500">Jelenleg nincsenek elérhető termékek.</p>
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