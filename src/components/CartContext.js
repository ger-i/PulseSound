import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inicializáljuk a kosár elemeket a helyi tárolóból, ha léteznek
  // Ha nincs, akkor egy üres tömböt adunk vissza
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Hiba a kosár betöltése során:', error);
      return [];
    }
  });

  // Minden alkalommal, amikor a kosár elemek változnak, elmentjük őket a helyi tárolóba
  // Ez lehetővé teszi, hogy a kosár tartalma megmaradjon
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Hiba a kosár mentése során:', error);
    }
  }, [cartItems]);

  // Kosár műveletek
  // A kosár műveletekhez szükséges függvények, mint péld as addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount és isCartEmpty
  const addToCart = (product) => {
    if (!product?.id || !product?.quantity || !product?.price || !product?.name) {
      console.error("Hiányos termék adatok");
      return false;
    }

    try {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );
        } else {
          const { id, name, price, image, quantity } = product;
          return [...prevItems, { id, name, price, image, quantity }];
        }
      });
      return true;
    } catch (error) {
      console.error('Hiba a termék hozzáadása során:', error);
      return false;
    }
  };

  // Eltávolítja a terméket a kosárból a termék azonosítója alapján
  // Ha a termék nem található, akkor nem történik semmi
  const removeFromCart = (productId) => {
    try {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
      return true;
    } catch (error) {
      console.error('Hiba a termék eltávolítása során:', error);
      return false;
    }
  };
  // Frissíti a termék mennyiségét a kosárban
  // Ha a mennyiség kisebb, mint 1, akkor hibaüzenetet ír ki
  // Ha a termék nem található, akkor nem történik semmi
  const updateQuantity = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity < 1) {
      console.error("A mennyiség legalább 1 kell legyen");
      return false;
    }

    try {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
      return true;
    } catch (error) {
      console.error('Hiba a mennyiség frissítése során:', error);
      return false;
    }
  };
  // Törli az összes terméket a kosárból
  // Ha a kosár már üres, akkor nem történik semmi
  const clearCart = () => {
    try {
      setCartItems([]);
      return true;
    } catch (error) {
      console.error('Hiba a kosár ürítése során:', error);
      return false;
    }
  };

  const getCartTotal = () => {
    try {
      return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    } catch (error) {
      console.error('Hiba a kosár összeg számítása során:', error);
      return 0;
    }
  };

  const getCartCount = () => {
    try {
      return cartItems.reduce((acc, item) => acc + item.quantity, 0);
    } catch (error) {
      console.error('Hiba a kosár darabszám számítása során:', error);
      return 0;
    }
  };

  const isCartEmpty = () => cartItems.length === 0;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
        updateQuantity,
        isCartEmpty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
