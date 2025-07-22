import './App.css';
import React from "react";
// React Router komponensek importálása a navigációhoz
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavFoot from './components/NavFoot';
import Home from "./pages/Home";
import CategoryPage from "./components/CategoryPage";  
import ProductDetail from "./pages/ProductDetail";
import { CartProvider } from './components/CartContext';
import Cart from "./pages/Cart";

function App() {  
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavFoot />}>
            <Route index element={<Home />} />
            <Route path=":category" element={<CategoryPage />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
