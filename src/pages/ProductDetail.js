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
    
    // URL paraméterből kinyerjük a termék ID-ját
    const { id } = useParams();
    
    // A termék megkeresése az adatbázisban az ID alapján
    const product = products.find(item => item.id === parseInt(id, 10));
    
    // State-ek inicializálása
    const [quantity, setQuantity] = useState(1); // Kiválasztott mennyiség (alapértelmezett: 1)
    const { addToCart } = useContext(CartContext); // Kosár context elérése
    const [mainImage, setMainImage] = useState(product ? product.image : ''); // Főkép állapota
    
    /**
     * Kosárba helyezés kezelő függvény
     * A terméket hozzáadja a kosárhoz a kiválasztott mennyiséggel
     */
    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, quantity });
        }
    };
    
    /**
     * Komponens betöltésekor az oldal tetejére görget
     * Biztosítja, hogy minden termék megnyitásakor az oldal tetején legyünk
     */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    /**
     * Főkép beállítása a termék változásakor
     * Ha új terméket töltünk be, a főképet is frissíti
     */
    useEffect(() => {
        if (product && product.image) {
            setMainImage(product.image);
        }
    }, [product]);
    
    // Ha nincs termék (hibás ID), hibaüzenet megjelenítése
    if (!product) {
        return <h2>Termék nem található</h2>;
    }
    
    return (
        <div className="product-detail">
            
            {/* TERMÉK ALAPINFORMÁCIÓI SZEKCIÓ */}
            <div className="product-description">
                <div className="product-text">
                    {/* Termék neve */}
                    <h1>{product.name}</h1>
                    
                    {/* Termék leírása - fallback szöveggel */}
                    <p>{product.descriptions?.[0]?.text || 'Leírás nem elérhető'}</p>
                    
                    {/* Termék ára */}
                    <p>Ár: {product.price} Ft</p>
                </div>
                
                {/* MENNYISÉG KIVÁLASZTÓ ÉS KOSÁRBA HELYEZÉS SZEKCIÓ */}
                <div className="quantity-container">
                    <label htmlFor="quantity">MENNYISÉG:</label>
                    
                    {/* Számkiválasztó input custom gombokkal */}
                    <div className="number-input-container">
                        {/* Csökkentő gomb - 1 alatt nem mehet */}
                        <button 
                            type="button" 
                            className="number-control minus"
                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                            disabled={quantity <= 1}
                            aria-label="Csökkentés"
                        >
                            −
                        </button>
                        
                        {/* Mennyiség megjelenítő mező - csak olvasható */}
                        <input
                            type="number"
                            id="quantity"
                            className="number-display"
                            value={quantity}
                            readOnly
                            min="1"
                        />
                        
                        {/* Növelő gomb */}
                        <button 
                            type="button" 
                            className="number-control plus"
                            onClick={() => setQuantity(prev => prev + 1)}
                            aria-label="Növelés"
                        >
                            +
                        </button>
                    </div>
                    
                    {/* Kosárba helyezés gomb */}
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        KOSÁRBA TESZEM
                    </button>
                </div>
            </div>
            
            {/* TERMÉKKÉPEK SZEKCIÓ */}
            <div className="product-images">
                {/* Nagy főkép megjelenítése */}
                <div className="main-image">
                    <img src={mainImage} alt={product.name} />
                </div>
                
                {/* Kiskép galéria - főkép váltáshoz */}
                <div className="image-viewer">
                    {product.images && product.images.map((image, index) => (
                        <div
                            key={index}
                            className={`thumbnail ${mainImage === image ? 'active' : ''}`} // Aktív kiskép kiemelése
                            onClick={() => setMainImage(image)} // Főkép váltás kattintásra
                        >
                            <img src={image} alt={`${product.name} ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
            
            {/* RÉSZLETES TERMÉKLEÍRÁSOK KÉPEKKEL SZEKCIÓ */}
            <div className="image-details">
                {/* Minden részletes képhez tartozó leírás megjelenítése */}
                {product.dimages && product.descriptions && product.dimages.map((image, index) => (
                    <div key={index} className="image-description">
                        {/* Részletes kép lazy loading-gal a teljesítmény optimalizálásához */}
                        <img
                            src={image} 
                            alt={`${product.name} ${index + 1}`}    
                            loading="lazy"
                        />
                        
                        {/* Hozzátartozó szöveges tartalom */}
                        <div className="text-container">
                            {/* Szekció címe - fallback címmel */}
                            <h3>{product.descriptions[index]?.title || `Tulajdonság ${index + 1}`}</h3>
                            
                            {/* Szekció leírása - fallback szöveggel */}
                            <p>{product.descriptions[index]?.text || 'Leírás nem elérhető'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetail;