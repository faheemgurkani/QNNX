import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import AuthCard from "./components/AuthCard";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      theme: darkMode ? "dark" : "light",
    });
  };

  const removeFromCart = (index) => {
    const removedItem = cart[index];
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    toast.error(`${removedItem.name} removed from cart`, {
      position: "top-right",
      autoClose: 3000,
      theme: darkMode ? "dark" : "light",
    });
  };

  return (
    <Router>
      <ToastContainer />
      {isAuthenticated && (
        <Navbar 
          cartCount={cart.length} 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <AuthCard onLogin={() => setIsAuthenticated(true)} />
            )
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <HomePage cart={cart} addToCart={addToCart} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/product/:id"
          element={
            isAuthenticated ? (
              <ProductPage addToCart={addToCart} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/cart"
          element={
            isAuthenticated ? (
              <CartPage cartItems={cart} removeFromCart={removeFromCart} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;