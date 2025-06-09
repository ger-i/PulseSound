// Ez a komponens jeleníti meg a kategóriákhoz tartozó termékeket. A termékeket a productsData.js fájlban tároljuk.

import React from 'react';
import { useParams } from 'react-router-dom'; // Importáljuk a useParams hook-ot
import ProductPage from '../pages/ProductPage';
import products from './ProductsData';
import earbudsBanner from '../images/earbuds/products4b.jpg';
import headphonesBanner from '../images/headphones/hpb1b.jpg';
import microphonesBanner from '../images/microphones/mp2.jpg';
import speakersBanner from '../images/speakers/sp1.jpg';

const categoryData = {
    Earbuds: {
        title: "Fülhallgatóink",
        bannerImage: earbudsBanner
    },
    Headphones: {
        title: "Fejhallgatóink",
        bannerImage: headphonesBanner
    },
    Microphones: {
        title: "Mikrofonjaink",
        bannerImage: microphonesBanner
    },
    Speakers: {
        title: "Hangszóróink",
        bannerImage: speakersBanner
    }
};

const CategoryPage = () => {
    const { category } = useParams(); // A kategóriát az útvonalból vesszük ki
    const categoryProducts = products.filter(product => product.category === category);
    const { title, bannerImage } = categoryData[category];

    return (
        <ProductPage
            title={title}
            bannerImage={bannerImage}
            products={categoryProducts}
        />
    );
};

export default CategoryPage;