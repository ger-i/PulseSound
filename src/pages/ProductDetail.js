import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import products from '../components/ProductsData';
import CartContext from '../components/CartContext';

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (product?.image) {
            setMainImage(product.image);
        }
    }, [product]);

    if (!product) {
        return <h2 className="text-center text-2xl mt-10">Termék nem található</h2>;
    }

    return (
        <div className="w-full mx-auto px-4 pt-10">
            {/* Felső szekció: leírás + kép */}
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Leírás és kosár gomb */}
                <div className="order-1 lg:order-2 w-full lg:w-1/2 max-w-3xl mx-auto text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{product.name}</h1>
                    <p className="text-xl sm:text-2xl text-gray-600 mt-2">{product.descriptions?.[0]?.text || 'Leírás nem elérhető'}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-700 mt-2">Ár: {product.price} Ft</p>

                    {/* Mennyiség + gomb */}
                    <div className="mt-6">
                        <label htmlFor="quantity" className="text-lg text-gray-800 block mb-2">MENNYISÉG:</label>
                        <div className="flex justify-center gap-2 mb-4">
                            <button
                                type="button"
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-700 active:bg-orange-800"
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                disabled={quantity <= 1}
                            >
                                −
                            </button>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                readOnly
                                min="1"
                                className="w-20 h-10 text-center text-lg border border-gray-300 rounded-lg bg-gray-100 shadow-inner transition-all hover:border-blue-600 focus:scale-105 focus:outline-none"
                                style={{ appearance: 'textfield', MozAppearance: 'textfield' }}
                            />
                            <button
                                type="button"
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 active:bg-orange-800"
                                onClick={() => setQuantity(prev => prev + 1)}
                            >
                                +
                            </button>
                        </div>
                        <button
                            className="bg-orange-600 text-white px-6 py-3 text-lg rounded-lg hover:bg-orange-700 active:bg-orange-800"
                            onClick={handleAddToCart}
                        >
                            KOSÁRBA TESZEM
                        </button>
                    </div>
                </div>

                {/* Kép és képválasztó */}
                <div className="order-2 lg:order-1 w-full lg:w-[460px] flex flex-col lg:flex-row items-center lg:items-start gap-4">
                    {/* Nagy kép bal oldalon */}
                    <div className="w-[350px] h-[350px] lg:w-[460px] lg:h-[460px] border border-gray-300 rounded-xl overflow-hidden">
                        <img src={mainImage} alt={product.name} className="w-full h-full object-contain" />
                    </div>

                    {/* Kis képek jobb oldalon, egymás alatt */}
                    <div className="flex lg:flex-col gap-3 mt-4 lg:mt-0">
                        {product.images?.map((image, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer border-2 rounded-xl transition-all ${mainImage === image ? 'border-blue-500' : 'border-gray-300'}`}
                                onClick={() => setMainImage(image)}
                            >
                                <img
                                    src={image}
                                    alt={`${product.name} ${index + 1}`}
                                    className="w-20 h-20 object-contain p-1"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Részletes leírások */}
            <div className="mt-5 -mx-4 md:-mx-6 lg:-mx-8">
                {product.dimages?.map((image, index) => (
                    <div key={index} className="relative mb-1">
                        <img
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            loading="lazy"
                            className="w-full h-auto block object-cover"
                        />
                        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 shadow-md p-5 rounded-lg text-center min-w-[300px] mx-4">
                            <h3 className="text-sm lg:text-2xl uppercase text-orange-600 mb-2">
                                {product.descriptions[index]?.title || `Tulajdonság ${index + 1}`}
                            </h3>
                            <p className="text-xs lg:text-lg text-white">
                                {product.descriptions[index]?.text || 'Leírás nem elérhető'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetail;
