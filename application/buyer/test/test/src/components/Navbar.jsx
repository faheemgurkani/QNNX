import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  FaShoppingCart, 
  FaMoon, 
  FaSun, 
  FaUser, 
  FaHeart,
  FaBars,
  FaTimes,
  FaChevronDown
} from 'react-icons/fa';
import './Navbar.css';

function Navbar({ cartCount, darkMode, toggleDarkMode, onLogout, user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-top">
        <div className="navbar-container">
          <div className="navbar-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </div>
          
          <div className="navbar-left">
            <Link to="/" className="logo">
              <span className="logo-icon">QNXX</span>
              <span className="logo-text">SHOP</span>
            </Link>
          </div>

          <div className={`navbar-right ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <button 
              className="theme-toggle-nav"
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
            
            <Link to="/wishlist" className="nav-icon">
              <FaHeart size={18} />
              {user?.wishlistCount > 0 && <span className="icon-badge">{user.wishlistCount}</span>}
            </Link>
            
            <Link to="/cart" className="nav-icon">
              <FaShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="icon-badge cart-badge">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="user-dropdown">
                <button className="user-icon">
                  <div className="avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name">{user.name.split(' ')[0]}</span>
                  <FaChevronDown className="dropdown-arrow" />
                </button>
                <div className="dropdown-content">
                  <Link to="/profile" className="dropdown-item">
                    <FaUser className="dropdown-icon" /> Profile
                  </Link>
                  <Link to="/orders" className="dropdown-item">
                    <FaShoppingCart className="dropdown-icon" /> My Orders
                  </Link>
                  <Link to="/wishlist" className="dropdown-item">
                    <FaHeart className="dropdown-icon" /> Wishlist
                  </Link>
                  <button onClick={onLogout} className="dropdown-item">
                    <FaTimes className="dropdown-icon" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="auth-link btn-outline">Login</Link>
                <Link to="/register" className="auth-link btn-primary">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className={`navbar-bottom ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="navbar-links-container">
          <Link to="/products" className="nav-link">All Products</Link>
          <Link to="/categories/headphones" className="nav-link">Headphones</Link>
          <Link to="/categories/smartphones" className="nav-link">Smartphones</Link>
          <Link to="/categories/smartwatches" className="nav-link">Smartwatches</Link>
          <Link to="/categories/accessories" className="nav-link">Accessories</Link>
          <Link to="/deals" className="nav-link nav-link-highlight">
            <span className="highlight-badge">HOT</span> Today's Deals
          </Link>
          <Link to="/new-arrivals" className="nav-link">New Arrivals</Link>
          <Link to="/brands" className="nav-link">Brands</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;