// Ez a komponens a termék részletes leírását jeleníti meg. A termék adatait a productsdata.js fájlban tároljuk.
// A termék adatait a useParams() hook segítségével kapjuk meg, amely a termék azonosítóját adja vissza.
// A termék adatait a products tömbből keresi meg a find() metódus segítségével, majd megjeleníti a termék részletes leírását.
// A termék részletes leírásában megjelenítjük a termék nevét, leírását, árát, képeit és a termékhez tartozó további információkat.
// A termékhez tartozó képek között lehet váltani, amelyeket a setMainImage() függvény segítségével lehet megjeleníteni.
// A termék mennyiségét a felhasználó a quantity változó segítségével állíthatja be, amelyet a setQuantity() függvény segítségével lehet módosítani.
// A termék mennyiségét a felhasználó a handleQuantityChange() függvény segítségével állíthatja be, amely a mennyiség input mező értékének változására reagál.
// A termék adatait a felhasználó a handleAddToCart() függvény segítségével adhatja hozzá a kosárhoz, amely a addToCart() függvényt hívja meg a CartContext-ből.
// A termék oldalának betöltésekor az oldal tetejére görget a useEffect() hook segítségével, amely az oldal betöltődésekor fut le.
// Ha a termék nem található, akkor a felhasználó számára egy hibaüzenetet jelenít meg.

import React, { useState, useContext, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import products from '../components/ProductsData';
import CartContext from '../components/CartContext'; 
import './ProductDetail.css';

const ProductDetail = () => {   
    const { id } = useParams();
    const product = products.find(item => item.id === parseInt(id, 10));
    const [quantity, setQuantity] = useState(1); 
    const { addToCart } = useContext(CartContext); 
    const [mainImage, setMainImage] = useState(product ? product.image : '');

    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, quantity }); 
        }
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
            setQuantity(value);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!product) {
        return <h2>Termék nem található</h2>;
    }

    return (
        <div className="product-detail">
            <div className="product-description">
                <div className="product-text">
                    <h1>{product.name}</h1>
                    <p>{product.descriptions[0].text}</p> 
                    <p>Ár: {product.price} Ft</p>
                </div>
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

            <div className="product-images">
                <div className="main-image">
                    <img src={mainImage} alt={product.name} />
                </div>

                <div className="image-viewer">
                    {product.images && product.images.map((image, index) => (
                        <div
                            key={index}
                            className="thumbnail"
                            onClick={() => setMainImage(image)}
                            style={{ cursor: "pointer" }}
                        >
                            <img src={image} alt={`${product.name} ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="image-details">
                {product.dimages && product.dimages.map((image, index) => (
                    <div key={index} className="image-description">
                        <img
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            style={{ cursor: "default" }}
                        />
                        <div className="text-container">
                            <h3>{product.descriptions[index].title}</h3> 
                            <p>{product.descriptions[index].text}</p>   
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetail;