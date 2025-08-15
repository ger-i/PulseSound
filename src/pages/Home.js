import React from 'react';
import { useNavigate } from 'react-router-dom'; // Navigációs hook
// Termékképek importálása
import pod_1 from '../images/earbuds/pod2d.jpg';
import pods from '../images/pods.jpg';
import head_1 from '../images/headphones/hph7e.jpg';
import heads from '../images/heads.jpg';
import pss from '../images/pss.jpg';
import ps_1 from '../images/speakers/spe5e.jpg';
import mic_1 from '../images/microphones/mic2c.jpg';
import mics from '../images/mics.jpg';

const Home = () => {
  const navigate = useNavigate(); // Navigációs függvény

  /**
   * Újrafelhasználható kártyakomponens
   * - Megjelenít egy képet, címet, leírást és gombot
   * - A gomb navigál a megadott linkre
   * - A kártya lehet széles vagy keskeny
   */
  const ProductCard = ({ image, title, description, link, isWide }) => {
    return (
      <div className={`relative m-1 ${isWide ? 'flex-[6]' : 'flex-[4]'}`}>
        {/* Termékkép */}
        <img
          src={image}
          alt={title}
          className="w-full h-[450px] object-cover rounded-lg sm:h-[400px]"
        />
        {/* Szöveges overlay a képen */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center shadow-lg p-3 bg-black/40 rounded-lg">
          <h1 className="text-xl m-0">{title}</h1>
          <p className="text-base mt-2">{description}</p>
          {/* Navigációs gomb */}
          <button
            onClick={() => navigate(link)}
            className="mt-3 px-3 py-2 text-sm bg-[#25cacf] hover:bg-[#1fa5a9] text-white rounded transition duration-300 ease-in-out"
          >
            {link.startsWith('/product') ? 'Tovább a termékre' : 'Termékek'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans m-0 p-0">
      {/* Videó szekció - Hero banner */}
      <div className="relative mb-1">
        {/* Háttérvideó */}
        <video autoPlay loop muted playsInline className="w-full h-auto">
          <source
            src="https://videos.pexels.com/video-files/7710237/7710237-hd_2048_1080_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Szöveg a videó fölött */}
        <div className="absolute top-[30%] sm:top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[#25cacf] z-10 drop-shadow-lg ">
          <h1 className="text-[1.8rem] m-0 sm:text-[3.5rem]">Üdvözlünk a webshopunkban!</h1>
          <p className="text-[1.2rem] mt-2 sm:text-[2rem]">A legmodernebb kütyük.</p>
        </div>
      </div>

      {/* Termékkártyák szekció */}
      <div className="px-2">
        {/* 1. sor - Fülhallgatók kategória + kiemelt termék */}
        <div className="flex flex-col sm:flex-row gap-1 mb-1">
          <ProductCard
            image={pods}
            title="Fülhallgatók"
            description="Fedezd fel termékeinket."
            link="/Earbuds"
            isWide={true}
          />
          <ProductCard
            image={pod_1}
            title="JLab Go Sport+"
            description="Fedezd fel a legnagyobb darabszámban eladott fülhallgatónkat."
            link="/product/2"
            isWide={false}
          />
        </div>

        {/* 2. sor - Fejhallgatók kategória + kiemelt termék */}
        <div className="flex flex-col sm:flex-row gap-1 mb-1">
          <ProductCard
            image={head_1}
            title="JLab Audio Studio Pro"
            description="Fedezd fel a legnagyobb darabszámban eladott fejhallgatónkat."
            link="/product/15"
            isWide={false}
          />
          <ProductCard
            image={heads}
            title="Fejhallgatók"
            description="Fedezd fel termékeinket."
            link="/Headphones"
            isWide={true}
          />
        </div>

        {/* 3. sor - Hangszórók kategória + kiemelt termék */}
        <div className="flex flex-col sm:flex-row gap-1 mb-1">
          <ProductCard
            image={pss}
            title="Hangszórók"
            description="Fedezd fel termékeinket."
            link="/Speakers"
            isWide={true}
          />
          <ProductCard
            image={ps_1}
            title="Bluetooth Speakers BS/5"
            description="Fedezd fel a legnagyobb darabszámban eladott hangszórónkat."
            link="/product/20"
            isWide={false}
          />
        </div>

        {/* 4. sor - Mikrofonok kategória + kiemelt termék */}
        <div className="flex flex-col sm:flex-row gap-1 mb-1">
          <ProductCard
            image={mic_1}
            title="MAONO XLR/USB"
            description="Fedezd fel a legnagyobb darabszámban eladott mikrofonunkat."
            link="/product/23"
            isWide={false}
          />
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