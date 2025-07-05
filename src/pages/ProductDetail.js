/**
 * ProductDetail komponens
 * 
 * Ez a komponens a termék részletes leírását jeleníti meg. 
 * A termék adatait a productsdata.js fájlban tároljuk.
 * 
 * Funkcionalitás:
 * - Termék részletes adatainak megjelenítése
 * - Képek közötti váltás lehetősége
 * - Mennyiség beállítása
 * - Kosárba helyezés funkció
 * - Responsive design támogatás
 */

import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import products from '../components/ProductsData';
import CartContext from '../components/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
    // ===== HOOK-OK ÉS STATE VÁLTOZÓK =====
    
    // URL paraméterből kinyert termék ID
    const { id } = useParams();
    
    // Termék megkeresése az ID alapján a products tömbből
    const product = products.find(item => item.id === parseInt(id, 10));
    
    // Mennyiség state - alapértelmezett érték: 1
    const [quantity, setQuantity] = useState(1);
    
    // CartContext-ből importált addToCart függvény
    const { addToCart } = useContext(CartContext);
    
    // Főkép state - alapértelmezett érték a termék első képe
    const [mainImage, setMainImage] = useState(product ? product.image : '');

    // ===== EVENT HANDLER FÜGGVÉNYEK =====
    
    /**
     * Kosárba helyezés kezelője
     * Hozzáadja a terméket a kosárhoz a beállított mennyiséggel
     */
    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, quantity });
        }
    };

    /**
     * Mennyiség változás kezelője
     * Biztosítja, hogy csak pozitív értékek kerüljenek be
     * @param {Event} e - Input change event
     */
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
            setQuantity(value);
        }
    };

    // ===== EFFECT HOOK-OK =====
    
    /**
     * Oldal betöltésekor az oldal tetejére görget
     * Csak egyszer fut le a komponens mount-jánál
     */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    /**
     * Főkép frissítése új termékre navigáláskor
     * Fut le minden alkalommal, amikor a product objektum változik
     */
    useEffect(() => {
        if (product && product.image) {
            setMainImage(product.image);
        }
    }, [product]);

    // ===== ERROR HANDLING =====
    
    /**
     * Ha a termék nem található, hibaüzenetet jelenít meg
     */
    if (!product) {
        return <h2>Termék nem található</h2>;
    }

    // ===== RENDER =====
    
    return (
        <div className="product-detail">
            
            {/* ===== TERMÉK ALAPADATOK SZEKCIÓ ===== */}
            <div className="product-description">
                <div className="product-text">
                    {/* Termék neve */}
                    <h1>{product.name}</h1>
                    
                    {/* Termék első leírása (ha van) */}
                    <p>{product.descriptions?.[0]?.text || 'Leírás nem elérhető'}</p>
                    
                    {/* Termék ára */}
                    <p>Ár: {product.price} Ft</p>
                </div>
                
                {/* ===== MENNYISÉG ÉS KOSÁRBA HELYEZÉS ===== */}
                <div className="quantity-container">
                    <label htmlFor="quantity">MENNYISÉG:</label>
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                    <button onClick={handleAddToCart}>KOSÁRBA TESZEM</button>
                </div>
            </div>

            {/* ===== KÉPEK SZEKCIÓ ===== */}
            <div className="product-images">
                
                {/* Főkép megjelenítése */}
                <div className="main-image">
                    <img src={mainImage} alt={product.name} />
                </div>
                
                {/* Képek közötti váltás - thumbnail galéria */}
                <div className="image-viewer">
                    {product.images && product.images.map((image, index) => (
                        <div
                            key={index}
                            className="thumbnail"
                            onClick={() => setMainImage(image)} // Főkép váltása kattintásra
                            style={{ cursor: "pointer" }}
                        >
                            <img src={image} alt={`${product.name} ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== RÉSZLETES LEÍRÁSOK KÉPEKKEL ===== */}
            <div className="image-details">
                {product.dimages && product.descriptions && product.dimages.map((image, index) => (
                    <div key={index} className="image-description">
                        
                        {/* Részletes kép lazy loading-gal */}
                        <img
                            src={image} 
                            alt={`${product.name} ${index + 1}`}    
                            loading="lazy"  // Csak akkor töltődik be, ha a felhasználó eléri a képet
                            style={{ cursor: "default" }}   
                        />
                        
                        {/* Hozzátartozó szöveges leírás */}
                        <div className="text-container">
                            <h3>{product.descriptions[index]?.title || `Tulajdonság ${index + 1}`}</h3>
                            <p>{product.descriptions[index]?.text || 'Leírás nem elérhető'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetail;
