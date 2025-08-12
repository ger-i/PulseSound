import React from 'react';
import { useParams } from 'react-router-dom'; // React Router hook az URL paraméterek kinyeréséhez
import ProductPage from '../pages/ProductPage';
import products from './ProductsData';

// Banner képek importálása kategóriánként
import earbudsBanner from '../images/earbuds/products4b.jpg';
import headphonesBanner from '../images/headphones/hpb1b.jpg';
import microphonesBanner from '../images/microphones/mp2.jpg';
import speakersBanner from '../images/speakers/sp1.jpg';

/**
 * Kategória specifikus adatok (címek és banner képek)
 * Minden kategóriához tartozik egy cím és egy banner kép
 */
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

/**
 * CategoryPage komponens - Kategória alapú terméklista megjelenítése
 * Az URL-ből kinyert kategória alapján szűri a termékeket és megjeleníti őket
 */
const CategoryPage = () => {
    // URL paraméterből kinyerjük a kategória nevét (pl. /category/Earbuds -> "Earbuds")
    const { category } = useParams();
    
    // Termékek szűrése az aktuális kategória alapján
    const categoryProducts = products.filter(product => product.category === category);
    
    // Kategória specifikus adatok kinyerése (cím és banner kép)
    const { title, bannerImage } = categoryData[category];
    
    // ProductPage komponens renderelése a kategória specifikus adatokkal
    return (
        <ProductPage
            title={title}                    // Kategória cím
            bannerImage={bannerImage}        // Kategória banner kép
            products={categoryProducts}      // Szűrt termékek listája
        />
    );
};

export default CategoryPage;