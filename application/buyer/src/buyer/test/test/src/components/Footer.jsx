// Footer.js
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="logo">QNXX<span>SHOP</span></Link>
            <p className="footer-tagline">Your one-stop shop for the latest tech gadgets</p>
          </div>
          
          <div className="footer-links-container">
            <div className="footer-links-group">
              <h4 className="footer-heading">Shop</h4>
              <Link to="/products/headphones" className="footer-link">Headphones</Link>
              <Link to="/products/smartphones" className="footer-link">Smartphones</Link>
              <Link to="/products/smartwatches" className="footer-link">Smartwatches</Link>
              <Link to="/products/accessories" className="footer-link">Accessories</Link>
            </div>
            
            <div className="footer-links-group">
              <h4 className="footer-heading">Support</h4>
              <Link to="/contact" className="footer-link">Contact Us</Link>
              <Link to="/faq" className="footer-link">FAQs</Link>
              <Link to="/shipping" className="footer-link">Shipping Policy</Link>
              <Link to="/returns" className="footer-link">Returns & Exchanges</Link>
            </div>
            
            <div className="footer-links-group">
              <h4 className="footer-heading">Company</h4>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/blog" className="footer-link">Blog</Link>
              <Link to="/careers" className="footer-link">Careers</Link>
              <Link to="/press" className="footer-link">Press</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-legal">
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/cookies" className="footer-link">Cookie Policy</Link>
          </div>
          
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaLinkedin />
            </a>
          </div>
          
          <p className="copyright">
            &copy; {new Date().getFullYear()} <strong>QNXX SHOP</strong>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;