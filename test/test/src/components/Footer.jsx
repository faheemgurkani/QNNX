import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-link">Terms of Service</Link>
        </div>

        <div className="social-links">
          <a href="https://facebook.com" target="_blank" className="social-icon">🌐</a>
          <a href="https://twitter.com" target="_blank" className="social-icon">🐦</a>
          <a href="https://instagram.com" target="_blank" className="social-icon">📸</a>
        </div>

        <p className="copyright">
          &copy; 2025 <strong>BuyNow</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
