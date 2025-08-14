import FooterImg from "../images/logo_1.png";

const Footer = () => {
  return (
    <footer className="bg-[#2c3e50] text-white p-1">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:px-8">

        {/* Bal oldal: logó */}
        <div className="w-full sm:w-1/3 flex justify-center sm:justify-start mb-4 sm:mb-0">
          <img
            src={FooterImg}
            alt="PulseSound logo"
            className="max-w-[150px] h-auto"
          />
        </div>

        {/* Közép: navigációs linkek */}
        <div className="sm:w-1/3 flex justify-center sm:items-center sm:h-full">
          <ul className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 list-none p-0 m-0">
            <li className="text-sm sm:text-base hover:text-gray-300 cursor-pointer">Kapcsolat</li>
            <li className="text-sm sm:text-base hover:text-gray-300 cursor-pointer">Garancia</li>
            <li className="text-sm sm:text-base hover:text-gray-300 cursor-pointer">Szállítás</li>
            <li className="text-sm sm:text-base hover:text-gray-300 cursor-pointer">ÁSZF</li>
            <li className="text-sm sm:text-base hover:text-gray-300 cursor-pointer">Rólunk</li>
          </ul>
        </div>

        {/* Jobb oldal: üres vagy jövőbeli tartalom */}
        <div className="sm:w-1/3"></div>
      </div>

      {/* Alsó jogi szöveg */}
      <div className="text-center mt-6">
        <p className="text-xs sm:text-sm text-[#bdc3c7] m-0">&copy; PULSESOUND by Geri.</p>
      </div>
    </footer>
  );
};

export default Footer;