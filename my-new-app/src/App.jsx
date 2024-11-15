// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout"; // Importera Layout-komponenten
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import ContactPage from "./pages/ContactPage";
import { CartProvider } from "./context/CartContext"; // Rätt import för CartProvider

function App() {
  return (
    <Router>
      <CartProvider>
        {" "}
        {/* Lägg till CartProvider här */}
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout-success" element={<CheckoutSucce