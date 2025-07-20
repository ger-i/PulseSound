import React, { useContext, useState, useEffect } from 'react';
import CartContext from '../components/CartContext';
import bannerImage from '../images/cart2b.jpg';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);
  const [submittedOrderTotal, setSubmittedOrderTotal] = useState(0);

  // Segédfüggvény a számok formázásához - mobilbarát verzió
  const formatPrice = (price) => {
    // parseInt-tel biztosítjuk, hogy szám legyen, majd saját formázás
    const numPrice = parseInt(price) || 0;
    return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  // useEffect a total újraszámításához - force re-render mobilon
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
  }, [cartItems]);

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
    
    alert('Köszönjük a rendelést!');
    clearCart();
    setOrderSubmitted(true);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1 && !isNaN(newQuantity)) {
      updateQuantity(id, newQuantity);
      // Force refresh mobilon
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

  const handleZipChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setZip(value);
    }
  };

  return (
    <div className="cart">
      <div className="cart-banner">
        <img src={bannerImage} alt="Kosár banner" />
      </div>

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
          <h2>A kosár tartalma:</h2>
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">A kosarad üres.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <div className="quantity-control">
                        <span>Ár: {formatPrice(item.price)} Ft x </span>
                        <div className="quantity-selector">
                          <button
                            type="button"
                            className="quantity-btn minus"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button
                            type="button"
                            className="quantity-btn plus"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <span key={`${item.id}-${item.quantity}`}> = {formatPrice(parseInt(item.price) * parseInt(item.quantity))} Ft</span>
                      </div>
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

          {cartItems.length > 0 && (
            <p className="cart-total" key={orderTotal}>
              Összesen: {formatPrice(orderTotal)} Ft
            </p>
          )}

          {error && <p className="error-message">{error}</p>}

          {cartItems.length > 0 && (
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
                    onChange={handleZipChange}
                    maxLength={4}
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
        </>
      )}
    </div>
  );
};

export default Cart;
