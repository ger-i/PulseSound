import React from 'react';
import { useNavigate } from 'react-router-dom';      // React Router navigációhoz
import './Home.css'; 
import pod_1 from '../images/earbuds/pod2d.jpg';     
import pods from '../images/pods.jpg';               
import head_1 from '../images/headphones/hph7e.jpg'; 
import heads from '../images/heads.jpg';             
import pss from '../images/pss.jpg';                 
import ps_1 from '../images/speakers/spe5e.jpg';     
import mic_1 from '../images/microphones/mic2c.jpg'; 
import mics from '../images/mics.jpg';               

/**
 * Home komponens - Főoldal komponens
 * 
 * Funkciók:
 * - Üdvözlő videó szekció háttér videóval
 * - Termék kategóriák és kiemelt termékek bemutatása
 * - Reszponzív kártya layout (széles és keskeny kártyák)
 * - Navigáció termék és kategória oldalakra
 * - Vizuálisan vonzó landing page élmény
 */

const Home = () => {
  const navigate = useNavigate(); // Programozott navigáció hook

  /**
   * ProductCard komponens - Újrafelhasználható termék/kategória kártya
   */
  const ProductCard = ({ image, title, description, link, isWide }) => {
    return (
      <div className={isWide ? 'container-wide' : 'container-narrow'}>
        {/* Kártya háttérkép */}
        <img src={image} alt={title} />
        
        {/* Szöveg overlay a kép tetején */}
        <div className="text-overlay">
          <h1>{title}</h1>
          <p>{description}</p>
          {/* Dinamikus gomb szöveg: termék vs kategória alapján */}
          <button onClick={() => navigate(link)}>
            {link.startsWith('/product') ? 'Tovább a termékre' : 'Termékek'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Videó szekció - Hero banner videóval */}
      <div className="video-container">
        {/* Autoplay háttér videó */}
        <video autoPlay loop muted playsInline style={{ width: '100%', height: 'auto' }}> 
          <source
            src="https://videos.pexels.com/video-files/7710237/7710237-hd_2048_1080_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Videó feletti szöveg overlay */}
        <div className="video-text">
          <h1>Üdvözlünk a webshopunkban!</h1>
          <p>A legmodernebb kütyük.</p>
        </div>
      </div>

      {/* Termékek szekció - Kártya grid layout */}
      <div className="container-wrapper">
        
        {/* 1. sor: Fülhallgatók kategória + Kiemelt fülhallgató */}
        <div className="row">
          {/* Széles kártya - Fülhallgatók kategória */}
          <ProductCard
            image={pods}
            title="Fülhallgatók"
            description="Fedezd fel termékeinket."
            link="/Earbuds"
            isWide={true}
          />
          {/* Keskeny kártya - Kiemelt fülhallgató termék */}
          <ProductCard
            image={pod_1}
            title="JLab Go Sport+"
            description="Fedezd fel a legnagyobb darabszámban eladott fülhallgatónkat."
            link="/product/2"
            isWide={false}
          />
        </div>

        {/* 2. sor: Kiemelt fejhallgató + Fejhallgatók kategória */}
        <div className="row">
          {/* Keskeny kártya - Kiemelt fejhallgató termék */}
          <ProductCard
            image={head_1}
            title="JLab Audio Studio Pro"
            description="Fedezd fel a legnagyobb darabszámban eladott fejhallgatónkat."
            link="/product/15"
            isWide={false}
          />
          {/* Széles kártya - Fejhallgatók kategória */}
          <ProductCard
            image={heads}
            title="Fejhallgatók"
            description="Fedezd fel termékeinket."
            link="/Headphones"
            isWide={true}
          />
        </div>

        {/* 3. sor: Hangszórók kategória + Kiemelt hangszóró */}
        <div className="row">
          {/* Széles kártya - Hangszórók kategória */}
          <ProductCard
            image={pss}
            title="Hangszórók"
            description="Fedezd fel termékeinket."
            link="/Speakers"
            isWide={true}
          />
          {/* Keskeny kártya - Kiemelt hangszóró termék */}
          <ProductCard
            image={ps_1}
            title="Bluetooth Speakers BS/5"
            description="Fedezd fel a legnagyobb darabszámban eladott hangszórónkat."
            link="/product/20"
            isWide={false}
          />
        </div>

        {/* 4. sor: Kiemelt mikrofon + Mikrofonok kategória */}
        <div className="row">
          {/* Keskeny kártya - Kiemelt mikrofon termék */}
          <ProductCard
            image={mic_1}
            title="MAONO XLR/USB"
            description="Fedezd fel a legnagyobb darabszámban eladott mikrofonunkat."
            link="/product/23"
            isWide={false}
          />
          {/* Széles kártya - Mikrofonok kategória */}
          <ProductCard
            image={mics}
            title="Mikrofonok"
            description="Fedezd fel termékeinket."
            link="/Microphones"
            isWide={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;