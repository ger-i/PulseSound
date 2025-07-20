import React, { useContext, useState, useEffect } from 'react';
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
  const [forceUpdate, setForceUpdate] = useState(0); // Új állapot a frissítés kényszerítéséhez

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
    const quantity = Math.max(1, Math.floor(newQuantity));
    if (!isNaN(quantity)) {
      updateQuantity(id, quantity);
      // Kényszerítjük az újrarenderelést
      setForceUpdate(prev => prev + 1);
    }
  };

  const handleInputChange = (id, e) => {
    const value = parseInt(e.target.value) || 1;
    handleQuantityChange(id, value);
  };

  const handleZipChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setZip(value);
    }
  };

  // Frissítjük a végösszeget minden változásnál
  useEffect(() => {
    setOrderTotal(getCartTotal());
  }, [cartItems, forceUpdate, getCartTotal]);

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
            <li><span>Összeg:</span> {orderTotal.toLocaleString()} Ft</li>
          </ul>
        </div>
      ) : (
        <>
          <h2>A kosár tartalma:</h2>
          
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">A kosarad üres.</p>
          ) : (
            <ul className="cart-items-list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item-container">
                  <div className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      
                      <div className="quantity-control">
                        <span className="price-text">Ár: {item.price} Ft x </span>
                        <div className="quantity-selector">
                          <button 
                            type="button"
                            className="quantity-btn minus"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleInputChange(item.id, e)}
                            className="quantity-input"
                          />
                          
                          <button 
                            type="button"
                            className="quantity-btn plus"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <span className="item-total"> = {(item.price * item.quantity).toLocaleString()} Ft</span>
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
            <p className="cart-total">
              Összesen: {getCartTotal().toLocaleString()} Ft
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
                
                <button type="submit" className="submit-order-btn">Rendelés leadása</button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
