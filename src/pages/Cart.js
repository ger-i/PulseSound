/**
 * Cart komponens
 * 
 * Ez a komponens a kosár tartalmat és a rendelési folyamatot kezeli.
 * 
 * Funkcionalitás:
 * - Kosár tartalmának megjelenítése
 * - Termékek mennyiségének módosítása
 * - Termékek eltávolítása a kosárból
 * - Rendelési űrlap kezelése
 * - Rendelés validálása és leadása
 * - Rendelés visszaigazolása
 */
import React, { useContext, useState } from 'react';
import CartContext from '../components/CartContext';
import bannerImage from '../images/cart2b.jpg';
import './Cart.css';

const Cart = () => {
  // ===== CONTEXT ÉS KOSÁR MŰVELETEK =====
  
  /**
   * CartContext-ből importált függvények és adatok
   * - cartItems: kosár tartalma
   * - removeFromCart: termék eltávolítása
   * - getCartTotal: kosár összegének kiszámítása
   * - clearCart: kosár teljes ürítése
   * - updateQuantity: termék mennyiségének frissítése
   */
  const { cartItems, removeFromCart, getCartTotal, clearCart, updateQuantity } = useContext(CartContext);
  
  // ===== ŰRLAP STATE VÁLTOZÓK =====
  
  /**
   * Rendelési űrlap mezőinek state-jei
   * Minden mező külön state-tel rendelkezik a kontrollált bemenet érdekében
   */
  const [name, setName] = useState('');           // Vásárló neve
  const [email, setEmail] = useState('');         // E-mail cím
  const [zip, setZip] = useState('');             // Irányítószám (csak számok, max 4 karakter)
  const [city, setCity] = useState('');           // Város név
  const [street, setStreet] = useState('');       // Utca név
  const [houseNumber, setHouseNumber] = useState(''); // Házszám
  
  // ===== ÁLLAPOT KEZELŐ STATE VÁLTOZÓK =====
  
  const [orderSubmitted, setOrderSubmitted] = useState(false); // Rendelés leadva-e
  const [error, setError] = useState('');                      // Hibaüzenetek tárolása
  const [orderTotal, setOrderTotal] = useState(0);             // Rendelés összege (mentés a kosár törlése előtt)
  
  // ===== VALIDÁCIÓS FÜGGVÉNYEK =====
  
  /**
   * E-mail cím validálása regex segítségével
   * @param {string} email - Validálandó e-mail cím
   * @returns {boolean} - Érvényes-e az e-mail cím
   */
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // ===== EVENT HANDLER FÜGGVÉNYEK =====
  
  /**
   * Rendelés leadásának kezelője
   * - Validálja az összes mezőt
   * - Ellenőrzi a kosár tartalmát
   * - Sikeres rendelés esetén törli a kosarat és megjeleníti a visszaigazolást
   * @param {Event} e - Form submit event
   */
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setError(''); // Korábbi hibák törlése
    
    // Kosár üres ellenőrzése
    if (cartItems.length === 0) {
      setError('A kosár üres. Kérjük, adjon hozzá termékeket a rendelés leadásához.');
      return;
    }
    
    // Kötelező mezők kitöltésének ellenőrzése
    if (!name || !email || !zip || !city || !street || !houseNumber) {
      setError('Kérjük, töltse ki az összes mezőt.');
      return;
    }
    
    // E-mail cím validálása
    if (!validateEmail(email)) {
      setError('Kérjük, adjon meg egy érvényes e-mail címet.');
      return;
    }
    
    // Rendelés összegének mentése a kosár törlése előtt
    const total = getCartTotal();
    setOrderTotal(total);
    
    // Rendelési adatok összeállítása
    const orderDetails = {
      name,
      email,
      address: `${zip}, ${city}, ${street} ${houseNumber}`,
      items: cartItems,
      total: total.toFixed(2),
    };
    
    // Konzolra kiírás (fejlesztési célokra)
    console.log('Order Submitted:', orderDetails);
    
    // Felhasználó értesítése
    alert('Köszönjük a rendelést!');
    
    // Kosár ürítése és rendelés állapotának beállítása
    clearCart();
    setOrderSubmitted(true);
  };
  
  /**
   * Termék mennyiségének változtatása
   */
  const handleQuantityChange = (id, newQuantity) => {
    // Csak pozitív számokat fogadunk el
    if (newQuantity >= 1 && !isNaN(newQuantity)) {
      updateQuantity(id, newQuantity);
    }
  };
  
  /**
   * Irányítószám bevitelének speciális kezelője
   * - Csak számokat enged meg
   * - Maximum 4 karaktert fogad el
   */
  const handleZipChange = (e) => {
    const value = e.target.value;
    // Regex: csak számjegyek, 0-4 karakter hosszúságig
    if (/^\d{0,4}$/.test(value)) {
      setZip(value);
    }
  };
  
  // ===== KOMPONENS RENDER =====
  return (
    <div className="cart">
      
      {/* ===== BANNER KÉP ===== */}
      <div className="cart-banner">
        <img src={bannerImage} alt="Kosár banner" />
      </div>
      
      {/* ===== RENDELÉS VISSZAIGAZOLÁSA ===== */}
      {orderSubmitted ? (
        <div className="order-confirmation">
          <h2>Köszönjük a rendelést!</h2>
          <p>A rendelés részletei:</p>
          <ul>
            <li><span>Név:</span> {name}</li>
            <li><span>E-mail:</span> {email}</li>
            <li><span>Szállítási cím:</span> {zip}, {city}, {street} {houseNumber}</li>
            <li><span>Összeg:</span> {orderTotal.toLocaleString()} Ft</li>
          </ul>
        </div>
      ) : (
        <>
          <h2>A kosár tartalma:</h2>
          
          {/* ===== KOSÁR TARTALOM ===== */}
          {cartItems.length === 0 ? (
            // Üres kosár esetén
            <p className="empty-cart-message">A kosarad üres.</p>
          ) : (
            // Kosár elemek megjelenítése
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div className="cart-item">
                    {/* Termék képe */}
                    <img src={item.image} alt={item.name} />
                    
                    <div className="item-details">
                      {/* Termék neve */}
                      <h3>{item.name}</h3>
                      
                      {/* Ár és mennyiség bemenet */}
                      <p>Ár: {item.price} Ft x </p>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      />
                      
                      {/* Részösszeg */}
                      <p> = {item.price * item.quantity} Ft</p>
                      
                      {/* Törlés gomb */}
                      <button onClick={() => removeFromCart(item.id)}>
                        Töröl
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          
          {/* ===== KOSÁR ÖSSZEG ===== */}
          {cartItems.length > 0 && (
            <p className="cart-total">
              Összesen: {getCartTotal().toLocaleString()} Ft
            </p>
          )}
          
          {/* ===== HIBAÜZENETEK ===== */}
          {error && <p className="error-message">{error}</p>}
          
          {/* ===== RENDELÉSI ŰRLAP ===== */}
          {cartItems.length > 0 && (
            <div className="order-form">
              <h2>Rendelési adatok</h2>
              <form onSubmit={handleOrderSubmit}>
                
                {/* Név mező */}
                <div className="form-group">
                  <label htmlFor="name">Név</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                {/* E-mail mező */}
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                {/* Irányítószám mező (speciális validációval) */}
                <div className="form-group">
                  <label htmlFor="zip">Irányítószám</label>
                  <input
                    type="text"
                    id="zip"
                    value={zip}
                    onChange={handleZipChange} // Csak számokat fogad el
                    maxLength={4} // Maximum 4 karakter
                    required
                  />
                </div>
                
                {/* Város mező */}
                <div className="form-group">
                  <label htmlFor="city">Város</label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                
                {/* Utca mező */}
                <div className="form-group">
                  <label htmlFor="street">Közterület neve</label>
                  <input
                    type="text"
                    id="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </div>
                
                {/* Házszám mező */}
                <div className="form-group">
                  <label htmlFor="houseNumber">Házszám</label>
                  <input
                    type="text"
                    id="houseNumber"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    required
                  />
                </div>
                
                {/* Rendelés leadása gomb */}
                <button type="submit">Rendelés leadása</button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
