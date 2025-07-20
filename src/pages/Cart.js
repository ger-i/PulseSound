import React, { useContext, useState } from 'react';
import CartContext from '../components/CartContext';
import bannerImage from '../images/cart2b.jpg';
import './Cart.css';

const Cart = () => {
  // Kosár kontextus és funkciók importálása
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  
  // Rendelési űrlap állapotváltozói
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  
  // Rendelés állapotának követése
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);

  /**
   * E-mail cím validációs függvény
   * @param {string} email - A validálandó e-mail cím
   * @returns {boolean} - True, ha érvényes az e-mail formátum
   */
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  /**
   * Rendelés leadásának kezelése
   * Validálja a form adatokat és elküldi a rendelést
   * @param {Event} e - Form submit esemény
   */
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Kosár üres ellenőrzése
    if (cartItems.length === 0) {
      setError('A kosár üres. Kérjük, adjon hozzá termékeket a rendelés leadásához.');
      return;
    }
    
    // Kötelező mezők ellenőrzése
    if (!name || !email || !zip || !city || !street || !houseNumber) {
      setError('Kérjük, töltse ki az összes mezőt.');
      return;
    }
    
    // E-mail validáció
    if (!validateEmail(email)) {
      setError('Kérjük, adjon meg egy érvényes e-mail címet.');
      return;
    }
    
    // Végösszeg kiszámítása és rendelési adatok összeállítása
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setOrderTotal(total);
    
    const orderDetails = {
      name,
      email,
      address: `${zip}, ${city}, ${street} ${houseNumber}`,
      items: cartItems,
      total: total.toFixed(2),
    };
    
    // Rendelés elküldése (jelenleg csak konzolba és alert)
    console.log('Order Submitted:', orderDetails);
    alert('Köszönjük a rendelést!');
    
    // Kosár ürítése és sikeres rendelés állapot beállítása
    clearCart();
    setOrderSubmitted(true);
  };
  
  /**
   * Termék mennyiségének módosítása
   * @param {number} id - A termék azonosítója
   * @param {number} newQuantity - Az új mennyiség
   */
  const handleQuantityChange = (id, newQuantity) => {
    // Csak pozitív számokat fogadunk el
    if (newQuantity >= 1 && !isNaN(newQuantity)) {
      updateQuantity(id, newQuantity);
    }
  };
  
  /**
   * Irányítószám input kezelése
   * Csak 4 számjegyű értékeket engedélyez
   * @param {Event} e - Input change esemény
   */
  const handleZipChange = (e) => {
    const value = e.target.value;
    // Regex: csak 0-4 számjegy hosszúságú számok
    if (/^\d{0,4}$/.test(value)) {
      setZip(value);
    }
  };

  return (
    <div className="cart">
      {/* Kosár banner kép */}
      <div className="cart-banner">
        <img src={bannerImage} alt="Kosár banner" />
      </div>
      
      {/* Sikeres rendelés megerősítése */}
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
          {/* Kosár tartalmának megjelenítése */}
          <h2>A kosár tartalma:</h2>
          
          {/* Üres kosár üzenet */}
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">A kosarad üres.</p>
          ) : (
            /* Kosárban lévő termékek listája */
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div className="cart-item">
                    {/* Termék képe */}
                    <img src={item.image} alt={item.name} />
                    
                    <div className="item-details">
                      {/* Termék neve */}
                      <h3>{item.name}</h3>
                      
                      {/* Mennyiség kezelő vezérlők */}
                      <div className="quantity-control">
                        <span>Ár: {item.price} Ft x </span>
                        <div className="quantity-selector">
                          {/* Mennyiség csökkentő gomb */}
                          <button 
                            type="button"
                            className="quantity-btn minus"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          {/* Aktuális mennyiség megjelenítése */}
                          <span className="quantity-display">{item.quantity}</span>
                          {/* Mennyiség növelő gomb */}
                          <button 
                            type="button"
                            className="quantity-btn plus"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        {/* Termék részösszege */}
                        <span> = {item.price * item.quantity} Ft</span>
                      </div>
                      
                      {/* Termék eltávolítása a kosárból */}
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Töröl
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          
          {/* Kosár végösszege */}
          {cartItems.length > 0 && (
            <p className="cart-total">
                Összesen: {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()} Ft
            </p>
          )}
          
          {/* Hibaüzenetek megjelenítése */}
          {error && <p className="error-message">{error}</p>}
          
          {/* Rendelési űrlap - csak akkor jelenik meg, ha van termék a kosárban */}
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
                
                {/* Irányítószám mező - csak 4 számjegy */}
                <div className="form-group">
                  <label htmlFor="zip">Irányítószám</label>
                  <input
                    type="text"
                    id="zip"
                    value={zip}
                    onChange={handleZipChange}
                    maxLength={4}
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
                
                {/* Utcanév mező */}
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
