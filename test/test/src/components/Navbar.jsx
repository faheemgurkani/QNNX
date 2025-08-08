import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { FaMoon, FaSun } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ cartCount, darkMode, toggleDarkMode }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home" className="logo">QNXX<span> SHOP</span></Link>
      </div>

      <div className="navbar-center">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="🔍 Search for products, brands..." 
        />
      </div>

      <div className="navbar-right">
        <button 
          className="theme-toggle-nav"
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <>
              <FaSun className="theme-icon" />
              <span className="theme-text">Light Mode</span>
            </>
          ) : (
            <>
              <FaMoon className="theme-icon" />
              <span className="theme-text">Dark Mode</span>
            </>
          )}
        </button>
        
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart size={22} />
          <span>Cart</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;