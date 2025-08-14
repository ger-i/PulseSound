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

        {/* Jobb oldal: közösségi ikonok */}
        <div className="w-full sm:w-1/3 flex justify-center sm:justify-end gap-4 mt-4 sm:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg className="w-6 h-6 text-white hover:text-blue-400 transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg className="w-6 h-6 text-white hover:text-pink-400 transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Alsó jogi szöveg */}
      <div className="text-center mt-6">
        <p className="text-xs sm:text-sm text-[#bdc3c7] m-0">&copy; PULSESOUND by Geri.</p>
      </div>
    </footer>
  );
};

export default Footer;