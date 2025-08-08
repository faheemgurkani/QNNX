import { Link } from 'react-router-dom';
import './ProductDetails.css';

function ProductDetails({ product, addToCart }) {
  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-detail-image" 
          />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">
            {product.description}
          </p>
          
          <div className="product-actions">
            <button 
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <Link to="/home" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
          
          <div className="product-features">
            <h3>Features:</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;