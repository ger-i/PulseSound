/**
 * CartContext - Kosár állapotkezelő Context
 * 
 * Ez a Context API-t használja a kosár állapotának globális kezelésére.
 * Tartalmazza a kosár műveleteit és az adatok localStorage-ban történő mentését.
 * 
 * Funkcionalitás:
 * - Kosár elemek tárolása és kezelése
 * - LocalStorage integráció (adatok megmaradnak újratöltés után)
 * - Kosár műveletek (hozzáadás, eltávolítás, frissítés, ürítés)
 * - Számítások (összeg, darabszám)
 * - Error handling minden műveletnél
 */

import React, { createContext, useState, useEffect } from 'react';

// ===== CONTEXT LÉTREHOZÁSA =====
const CartContext = createContext();

/**
 * CartProvider komponens
 * A Context Provider wrapper komponens, amely az egész alkalmazást körülveszi
 */
export const CartProvider = ({ children }) => {
  
  // ===== STATE INICIALIZÁLÁS =====
  
  /**
   * Kosár elemek state inicializálása
   * - Először megpróbálja betölteni a localStorage-ból
   * - Ha nincs mentett adat vagy hiba van, üres tömböt ad vissza
   * - Try-catch blokkban van a JSON.parse hibák elkerülése végett
   */
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Hiba a kosár betöltése során:', error);
      return [];
    }
  });

  // ===== LOCALSTORAGE SZINKRONIZÁLÁS =====
  
  /**
   * CartItems változásainak figyelése és localStorage-ba mentése
   * - Minden alkalommal fut, amikor a cartItems változik
   * - Biztosítja az adatok megmaradását böngésző újratöltés után
   * - Error handling a localStorage írási hibák kezelésére
   */
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Hiba a kosár mentése során:', error);
    }
  }, [cartItems]);

  // ===== KOSÁR MŰVELETEK =====
  
  /**
   * Termék hozzáadása a kosárhoz
   */
  const addToCart = (product) => {
    // Bemeneti adatok validálása
    if (!product?.id || !product?.quantity || !product?.price || !product?.name) {
      console.error("Hiányos termék adatok");
      return false;
    }

    try {
      setCartItems((prevItems) => {
        // Meglévő termék keresése az ID alapján
        const existingItem = prevItems.find((item) => item.id === product.id);
        
        if (existingItem) {
          // Ha már van a kosárban, mennyiség növelése
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );
        } else {
          // Új termék hozzáadása (csak szükséges mezők)
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

  /**
   * Termék eltávolítása a kosárból
   * @param {number} productId - Eltávolítandó termék azonosítója
   * @returns {boolean} - Sikeres volt-e a művelet
   */
  const removeFromCart = (productId) => {
    try {
      setCartItems((prevItems) => 
        prevItems.filter((item) => item.id !== productId)
      );
      return true;
    } catch (error) {
      console.error('Hiba a termék eltávolítása során:', error);
      return false;
    }
  };

  /**
   * Termék mennyiségének frissítése a kosárban
   */
  const updateQuantity = (productId, newQuantity) => {
    // Mennyiség validálása
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

  /**
   * Teljes kosár ürítése
   */
  const clearCart = () => {
    try {
      setCartItems([]);
      return true;
    } catch (error) {
      console.error('Hiba a kosár ürítése során:', error);
      return false;
    }
  };

  // ===== SZÁMÍTÁSI FÜGGVÉNYEK =====

  /**
   * Kosár teljes összegének kiszámítása
   */
  const getCartTotal = () => {
    try {
      return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    } catch (error) {
      console.error('Hiba a kosár összeg számítása során:', error);
      return 0;
    }
  };

  /**
   * Kosárban lévő termékek összes darabszámának kiszámítása
   */
  const getCartCount = () => {
    try {
      return cartItems.reduce((acc, item) => acc + item.quantity, 0);
    } catch (error) {
      console.error('Hiba a kosár darabszám számítása során:', error);
      return 0;
    }
  };

  /**
   * Kosár üres állapotának ellenőrzése
   */
  const isCartEmpty = () => cartItems.length === 0;

  // ===== CONTEXT PROVIDER RENDER =====

  /**
   * Context Provider, amely az összes kosár funkciót elérhetővé teszi
   * a gyermek komponensek számára
   */
  return (
    <CartContext.Provider
      value={{
        // Kosár adatok
        cartItems,
        
        // Kosár műveletek
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        
        // Számítási függvények
        getCartTotal,
        getCartCount,
        isCartEmpty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;