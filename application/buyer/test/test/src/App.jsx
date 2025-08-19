import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigationType
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from './utils/axiosInstance';
import _ from 'lodash';
import Navbar from "./components/Navbar";
import AuthCard from "./components/AuthCard";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import Loading from "./components/Loading";
import AuthSuccess from './components/AuthSuccess';
import Footer from './components/Footer';
import "./App.css";

function AppWrapper() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (navigationType !== 'POP') {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [location, navigationType]);

  return isLoading ? <Loading /> : null;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setInitialLoading(false);
      return;
    }

    try {
      const res = await axios.get('/api/auth/me');
      setIsAuthenticated(true);
      setUser(res.data.user);
      setCart(res.data.cart);
    } catch (err) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const debouncedSearch = useRef(
    _.debounce((query) => {
      handleSearch(query);
    }, 500)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      const res = await axios.get(`/api/products?search=${query}`);
      setSearchResults(res.data.products);
    } catch (err) {
      toast.error('Failed to search products');
    } finally {
      setIsSearching(false);
    }
  };

  const addToCart = async (product) => {
    try {
      const { data } = await axios.post('/api/cart', {
        productId: product._id,
        quantity: 1
      });
      setCart(data.cart);
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        theme: darkMode ? "dark" : "light",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await axios.delete(`/api/cart/${productId}`);
      setCart(data.cart);
      toast.success('Item removed from cart');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove item');
    }
  };

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      setCart({ items: [], total: 0 });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <ToastContainer />
      <div className="app-container">
        {isAuthenticated && (
          <Navbar 
            cartCount={cart.items.length} 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode}
            onLogout={handleLogout}
            user={user}
            onSearch={handleSearch}
          />
        )}
        <AppWrapper />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" />
                ) : (
                  <AuthCard onLogin={handleLogin} />
                )
              }
            />
            <Route path="/auth/success" element={<AuthSuccess />} />
            <Route
              path="/home"
              element={
                isAuthenticated ? (
                  <>
                    <HomePage addToCart={addToCart} />
                    <Footer />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/product/:id"
              element={
                isAuthenticated ? (
                  <>
                    <ProductPage addToCart={addToCart} />
                    <Footer />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/cart"
              element={
                isAuthenticated ? (
                  <>
                    <CartPage 
                      cartItems={cart.items} 
                      total={cart.total}
                      removeFromCart={removeFromCart} 
                    />
                    <Footer />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/search"
              element={
                isAuthenticated ? (
                  <>
                    <SearchResultsPage 
                      results={searchResults} 
                      loading={isSearching}
                      addToCart={addToCart}
                    />
                    <Footer />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
