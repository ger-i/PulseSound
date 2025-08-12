/**
 * Footer komponens - Az oldal alján található lábléc
 * 
 * Funkciók:
 * - PulseSound logo megjelenítése
 * - Navigációs linkek (Kapcsolat, Garancia, Szállítás, ÁSZF, Rólunk)
 * - Jogi nyilatkozat/szerzői jogi információk
 * - Reszponzív design támogatás
 */

import FooterImg from "../images/logo_1.png";
import "./Footer.css"

/**
 * Footer komponens - Oldal lábléc renderelése
 */
const Footer = () => {
  return (
    <footer className="footer-pulsesound">
      {/* Fő footer tartalom wrapper */}
      <div className="footer-content">
        
        {/* Logo szekció */}
        <div className="footer-logo-container">
          <img 
            className="footer-logo" 
            src={FooterImg} 
            alt="PulseSound logo" // Akadálymentességi alt szöveg
          />
        </div>
        
        {/* Navigációs linkek szekciója */}
        <div className="footer-links-container">
          <ul className="footer-links">
            <li>Kapcsolat</li>     
            <li>Garancia</li>    
            <li>Szállítás</li>     
            <li>ÁSZF</li>           
            <li>Rólunk</li>       
          </ul>
        </div>
      </div>
      
      <div className="footer-credits">
        <p>&copy; PULSESOUND by Geri.</p> 
      </div>
    </footer>
  );
};

export default Footer;