import React, { useContext, useState, useEffect } from 'react';
import CartContext from '../components/CartContext';
import bannerImage from '../images/cart2b.jpg';

const Cart = () => {
  // A kosár állapotát és funkcióit (hozzáadás, törlés, frissítés) a CartContext-ből nyerjük ki.
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);

  // Állapotváltozók a felhasználói űrlap adataihoz.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  // Állapotváltozók az UI viselkedésének szabályozására.
  const [orderSubmitted, setOrderSubmitted] = useState(false); // Jelzi, hogy a rendelést elküldték-e már.
  const [error, setError] = useState(''); // Hibák megjelenítésére szolgál.

  // Állapotváltozók a rendelés összegének kezelésére.
  const [orderTotal, setOrderTotal] = useState(0); // Az aktuális kosár teljes összege.
  const [submittedOrderTotal, setSubmittedOrderTotal] = useState(0); // Az elküldött rendelés végösszege.

  // A pénznem formázását végző segédfüggvény.
  const formatPrice = (price) => {
    const numPrice = parseInt(price) || 0;
    return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  // Az `useEffect` horog (hook) a kosár tartalmának változásakor frissíti a teljes összeget.
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const itemPrice = parseInt(item.price) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;
      return sum + itemPrice * itemQuantity;
    }, 0);
    // Késleltetve frissítjük az állapotot, hogy elkerüljük az esetleges race condition-öket.
    setTimeout(() => setOrderTotal(total), 0);
  }, [cartItems]);

  // A felhasználó által megadott e-mail cím validálására szolgáló reguláris kifejezés.
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // A rendelés elküldéséért felelős eseménykezelő.
  const handleOrderSubmit = (e) => {
    e.preventDefault(); // Megakadályozza az űrlap alapértelmezett elküldési viselkedését.
    setError('');

    // Validációs ellenőrzések.
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

    // A rendelési adatok összeállítása és "elküldése".
    const orderDetails = {
      name,
      email,
      address: `${zip}, ${city}, ${street} ${houseNumber}`,
      items: cartItems,
      total: orderTotal,
    };
    console.log('Order Submitted:', orderDetails);

    // Frissítjük az állapotot, hogy megjelenjen a rendelést visszaigazoló üzenet.
    setSubmittedOrderTotal(orderTotal);
    alert('Köszönjük a rendelést!');
    clearCart();
    setOrderSubmitted(true);
  };

  // A termékek mennyiségének módosításáért felelős eseménykezelő.
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1 && !isNaN(newQuantity)) {
      updateQuantity(id, newQuantity);
      // Késleltetett összegfrissítés a mennyiség változása után.
      setTimeout(() => {
        const newTotal = cartItems.reduce((sum, item) => {
          const itemPrice = parseInt(item.price) || 0;
          const itemQuantity = item.id === id ? newQuantity : parseInt(item.quantity) || 0;
          return sum + itemPrice * itemQuantity;
        }, 0);
        setOrderTotal(newTotal);
      }, 50);
    }
  };

  // A postai irányítószám bevitelét korlátozó eseménykezelő.
  const handleZipChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) setZip(value);
  };

  return (
    <div className="flex flex-col items-center px-4">
      {/* Kiemelt banner kép */}
      <div className="w-screen">
        <img src={bannerImage} alt="Kosár banner" className="w-full h-auto block" />
      </div>

      {orderSubmitted ? (
        // Ez a rész akkor jelenik meg, ha a rendelést már elküldték.
        <div className="bg-gray-100 border border-green-500 rounded-lg p-6 text-center my-12 w-[90%] md:w-4/5 lg:w-3/5 xl:w-[800px] mx-auto">
          <h2 className="text-green-500 text-2xl before:content-['✅'] before:mr-2">Köszönjük a rendelést!</h2>
          <p className="text-lg font-bold text-gray-700 mt-2">A rendelés részletei:</p>
          <ul className="text-left m-2">
            <li><span className="font-bold">Név:</span> {name}</li>
            <li><span className="font-bold">E-mail:</span> {email}</li>
            <li><span className="font-bold">Szállítási cím:</span> {zip}, {city}, {street} {houseNumber}</li>
            <li><span className="font-bold">Összeg:</span> {formatPrice(submittedOrderTotal)} Ft</li>
          </ul>
        </div>
      ) : (
        // Ez a rész akkor jelenik meg, ha a kosár még aktív.
        <>
          <h2 className="text-center text-3xl text-orange-600 my-6">A kosár tartalma:</h2>
          {cartItems.length === 0 ? (
            // Üres kosár esetén megjelenő üzenet.
            <p className="italic font-bold mb-40">A kosarad üres.</p>
          ) : (
            // A kosárban lévő termékek listája.
            <ul className="list-none p-0 w-full max-w-2xl">
              {cartItems.map((item) => (
                <li key={item.id} className="border-b border-gray-300 py-4 flex items-center">
                  <img src={item.image} alt={item.name} className="w-[100px] h-[100px] object-contain mr-5 rounded shadow-sm" />
                  <div className="flex-1">
                    <h3 className="text-lg text-gray-700 mb-1">{item.name}</h3>
                    <div className="flex items-center flex-wrap gap-2">
                      <span>Ár: {formatPrice(item.price)} Ft x</span>
                      {/* Mennyiség módosító gombok */}
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="w-[35px] h-[35px] bg-gray-200 hover:bg-red-700 active:bg-gray-300 disabled:opacity-50 rounded"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >-</button>
                        <span className="font-bold mx-2">{item.quantity}</span>
                        <button
                          type="button"
                          className="w-[35px] h-[35px] bg-gray-200 hover:bg-red-700 active:bg-gray-300 rounded"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >+</button>
                      </div>
                      <span>= {formatPrice(item.price * item.quantity)} Ft</span>
                    </div>
                    {/* Eltávolítás gomb */}
                    <button
                      className="bg-red-500 text-white px-3 py-2 text-sm rounded hover:bg-red-700 transition mt-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Töröl
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {cartItems.length > 0 && (
            // A teljes kosár összegének megjelenítése.
            <p className="bg-gray-100 p-4 rounded text-lg font-bold mt-6">
              Összesen: {formatPrice(orderTotal)} Ft
            </p>
          )}

          {error && <p className="text-red-600 font-semibold mt-4">{error}</p>}

          {cartItems.length > 0 && (
            // Rendelési űrlap
            <div className="my-5 w-full max-w-sm bg-gray-100 p-5 rounded-lg shadow-md">
              <h2 className="text-orange-600 text-2xl mb-4">Rendelési adatok</h2>
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                {/* Űrlapmezők a felhasználó adataihoz. */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="font-bold mb-1">Név</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="font-bold mb-1">E-mail</label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="zip" className="font-bold mb-1">Irányítószám</label>
                  <input
                    type="text"
                    id="zip"
                    value={zip}
                    onChange={handleZipChange}
                    maxLength={4}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="city" className="font-bold mb-1">Város</label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="street" className="font-bold mb-1">Közterület neve</label>
                  <input
                    type="text"
                    id="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="houseNumber" className="font-bold mb-1">Házszám</label>
                  <input
                    type="text"
                    id="houseNumber"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    required
                  />
                </div>

                {/* Rendelés leadása gomb */}
                <button
                  type="submit"
                  className="bg-green-500 text-white px-5 py-3 rounded hover:bg-green-600 transition block mx-auto"
                >
                  Rendelés leadása
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;