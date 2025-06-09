import React, { useContext, useState } from 'react';
import CartContext from '../components/CartContext';
import bannerImage from '../images/cart2b.jpg';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, getCartTotal, clearCart, updateQuantity } = useContext(CartContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (cartItems.length === 0) {
      setError('A kosár üres. Kérjük, adjon hozzá termékeket a rendelés leadásához.');
      return;
    }

    if (!name || !email || !zip || !city || !street || !houseNumber) {
      setError('Kérjük, töltse ki az összes mezőt.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Kérjük, adjon meg egy érvényes e-mail címet.');
      return;
    }

    // Mentjük a rendelés összegét, mielőtt törölnénk a kosarat
    const total = getCartTotal();
    setOrderTotal(total);

    const orderDetails = {
      name,
      email,
      address: `${zip}, ${city}, ${street} ${houseNumber}`,
      items: cartItems,
      total: total.toFixed(2),
    };

    console.log('Order Submitted:', orderDetails);
    alert('Köszönjük a rendelést!');
    clearCart();
    setOrderSubmitted(true);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1 && !isNaN(newQuantity)) {
      updateQuantity(id, newQuantity);
    }
  };

  // Irányítószám bevitelének kezelése
  const handleZipChange = (e) => {
    const value = e.target.value;
    // Csak számokat engedünk meg, és maximum 4 karaktert
    if (/^\d{0,4}$/.test(value)) {
      setZip(value);
    }
  };

  return (
    <div className="cart">
      <div className="banner">
        <img src={bannerImage} alt="Kosár banner" />
      </div>
      <h2>A kosár tartalma</h2>
      {cartItems.length === 0 ? (
        <p>A kosarad üres.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Ár: {item.price} Ft x </p>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  />
                  <p> = {item.price * item.quantity} Ft</p>
                  <button onClick={() => removeFromCart(item.id)}>
                    Töröl
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <p className="cart-total">
          Összesen: {getCartTotal().toLocaleString()} Ft
        </p>
      )}

      {/* Hibák megjelenítése */}
      {error && <p className="error-message">{error}</p>}

      {/* Rendelési űrlap */}
      {cartItems.length > 0 && !orderSubmitted && (
        <div className="order-form">
          <h2>Rendelési adatok</h2>
          <form onSubmit={handleOrderSubmit}>
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

            <button type="submit">Rendelés leadása</button>
          </form>
        </div>
      )}

      {/* Rendelés visszaigazolása */}
      {orderSubmitted && (
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
      )}
    </div>
  );
};

export default Cart;