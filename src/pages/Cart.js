import React, { useContext, useState, useEffect } from 'react';
import CartContext from '../components/CartContext';
import bannerImage from '../images/cart2b.jpg';
import './Cart.css';

/**
 * Kosár komponens - kezeli a kosár tartalmát, mennyiségeket és rendelést
 */
const Cart = () => {
  // Context-ből származó kosár funkciók és adatok
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  
  // Rendelési adatok állapot változói
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  
  // UI állapot változók
  const [orderSubmitted, setOrderSubmitted] = useState(false); // Rendelés leadva-e
  const [error, setError] = useState(''); // Hibaüzenetek
  const [orderTotal, setOrderTotal] = useState(0); // Aktuális kosár összeg
  const [submittedOrderTotal, setSubmittedOrderTotal] = useState(0); // Leadott rendelés összege

  /**
   * Ár formázó függvény - ezres elválasztóval
   * Mobilbarát megoldás a számmá konvertálással
   * @param {number|string} price - Formázandó ár
   * @returns {string} - Formázott ár szóközökkel elválasztva
   */
  const formatPrice = (price) => {
    // parseInt-tel biztosítjuk, hogy szám legyen, majd saját formázás
    const numPrice = parseInt(price) || 0;
    return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  /**
   * useEffect hook a végösszeg automatikus újraszámításához
   * Mobilos renderelési problémák elkerülése érdekében setTimeout-tal
   */
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const itemPrice = parseInt(item.price) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;
      return sum + (itemPrice * itemQuantity);
    }, 0);
    
    // Kis késleltetés a mobilos renderelési problémák elkerülésére
    setTimeout(() => {
      setOrderTotal(total);
    }, 0);
  }, [cartItems]); // cartItems változásakor fut le

  /**
   * Email cím validátor függvény
   * @param {string} email - Validálandó email cím
   * @returns {boolean} - Igaz, ha valid az email
   */
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  /**
   * Rendelés leadása eseménykezelő
   * Validálja az adatokat és leadja a rendelést
   * @param {Event} e - Form submit esemény
   */
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Kosár üres ellenőrzés
    if (cartItems.length === 0) {
      setError('A kosár üres. Kérjük, adjon hozzá termékeket a rendelés leadásához.');
      return;
    }

    // Kötelező mezők ellenőrzése
    if (!name || !email || !zip || !city || !street || !houseNumber) {
      setError('Kérjük, töltse ki az összes mezőt.');
      return;
    }

    // Email validáció
    if (!validateEmail(email)) {
      setError('Kérjük, adjon meg egy érvényes e-mail címet.');
      return;
    }

    // Rendelési adatok összeállítása
    const orderDetails = {
      name,
      email,
      address: `${zip}, ${city}, ${street} ${houseNumber}`,
      items: cartItems,
      total: orderTotal,
    };

    console.log('Order Submitted:', orderDetails);
    
    // Elmentjük a végösszeget a clearCart előtt
    setSubmittedOrderTotal(orderTotal);
    
    // Sikeres rendelés visszajelzés és kosár ürítés
    alert('Köszönjük a rendelést!');
    clearCart();
    setOrderSubmitted(true);
  };

  /**
   * Termék mennyiség változtatás eseménykezelő
   * @param {string} id - Termék azonosító
   * @param {number} newQuantity - Új mennyiség
   */
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1 && !isNaN(newQuantity)) {
      updateQuantity(id, newQuantity);
      
      // Force refresh mobilon - végösszeg újraszámítása
      setTimeout(() => {
        const newTotal = cartItems.reduce((sum, item) => {
          const itemPrice = parseInt(item.price) || 0;
          const itemQuantity = item.id === id ? newQuantity : (parseInt(item.quantity) || 0);
          return sum + (itemPrice * itemQuantity);
        }, 0);
        setOrderTotal(newTotal);
      }, 50);
    }
  };

  /**
   * Irányítószám input kezelő - csak 4 számjegy engedélyezett
   * @param {Event} e - Input változás esemény
   */
  const handleZipChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) { // Regex: 0-4 számjegy
      setZip(value);
    }
  };

  return (
    <div className="cart">
      {/* Banner kép */}
      <div className="cart-banner">
        <img src={bannerImage} alt="Kosár banner" />
      </div>

      {/* Rendelés megerősítő oldal */}
      {orderSubmitted ? (
        <div className="order-confirmation">
          <h2>Köszönjük a rendelést!</h2>
          <p>A rendelés részletei:</p>
          <ul>
            <li><span>Név:</span> {name}</li>
            <li><span>E-mail:</span> {email}</li>
            <li><span>Szállítási cím:</span> {zip}, {city}, {street} {houseNumber}</li>
            <li><span>Összeg:</span> {formatPrice(submittedOrderTotal)} Ft</li>
          </ul>
        </div>
      ) : (
        <>
          {/* Kosár tartalom megjelenítése */}
          <h2>A kosár tartalma:</h2>
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">A kosarad üres.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div className="cart-item">
                    {/* Termék kép */}
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      {/* Termék név */}
                      <h3>{item.name}</h3>
                      
                      {/* Mennyiség vezérlők és ár kalkuláció */}
                      <div className="quantity-control">
                        <span>Ár: {formatPrice(item.price)} Ft x </span>
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
                          {/* Aktuális mennyiség */}
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
                        {/* Termék össz ár (ár x mennyiség) */}
                        <span key={`${item.id}-${item.quantity}`}> = {formatPrice(parseInt(item.price) * parseInt(item.quantity))} Ft</span>
                      </div>
                      
                      {/* Termék eltávolítása gomb */}
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

          {/* Kosár végösszeg megjelenítése */}
          {cartItems.length > 0 && (
            <p className="cart-total" key={orderTotal}>
              Összesen: {formatPrice(orderTotal)} Ft
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

                {/* Email mező */}
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