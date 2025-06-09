// Komponens leírása: Az oldal alján található lábléc komponense. A lábléc tartalmazza a PulseSound logót, valamint a lábléc menüpontjait. A lábléc alján található a jogi nyilatkozat.

import FooterImg from "../images/logo_1.png";
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer-pulsesound">
      <div className="footer-content">
        <div className="footer-logo-container">
          <img className="footer-logo" src={FooterImg} alt="Mediterran footer pic" />
        </div>
        <div className="footer-links-container">
          <ul className="footer-links">
            <li>Kapcsolat</li>
            <li>Garancia</li>
            <li>Szállítás</li>
            <li>ÁSZF</li>
            <li>PulseSound</li>
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