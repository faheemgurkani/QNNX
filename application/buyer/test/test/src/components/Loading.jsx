// Loading.js
import './Loading.css';

function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-logo">
          <span className="loading-logo-icon">QNXX</span>
          <span className="loading-logo-text">SHOP</span>
        </div>
        <div className="loading-spinner">
          <div className="loading-spinner-dot"></div>
          <div className="loading-spinner-dot"></div>
          <div className="loading-spinner-dot"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;