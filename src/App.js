import './App.css';
import React from "react";
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



/*
let a = 1;

while (a < 100) {
    console.log(a); // Kiírja az aktuális értéket
    a += 3; // 3-mal növeli az a értékét
}
*/


/*
for (let a = 1; a < 110; a += 3) {
    console.log(a); 
}
*/