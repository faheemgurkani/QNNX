import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image" 
          loading="lazy"
        />
      </Link>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <div className="product-card-actions">
        <button 
          className="add-to-cart" 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
        <Link 
          to={`/product/${product.id}`} 
          className="view-details-btn"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;