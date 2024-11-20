import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import ContactPage from "./pages/ContactPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}

export default App;
