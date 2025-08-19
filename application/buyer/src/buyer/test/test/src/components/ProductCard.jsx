// ProductCard.js
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { FaStar, FaRegStar, FaShoppingCart, FaEye, FaHeart } from 'react-icons/fa';
import { useState } from 'react';

function ProductCard({ product, addToCart, addToWishlist, isInWishlist }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist);

  const renderStars = () => {
    const stars = [];
    const rating = product.rating || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= Math.floor(rating) ? 
        <FaStar key={i} className="star-filled" /> : 
        <FaRegStar key={i} className="star-empty" />
      );
    }
    return stars;
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    const newWishlistStatus = !isWishlisted;
    setIsWishlisted(newWishlistStatus);
    addToWishlist(product._id, newWishlistStatus);
  };

  const getProductImage = () => {
    if (product.image) return product.image;
    
    switch(product.category) {
      case 'Headphones':
        return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
      case 'Smartphones':
        return 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80';
      case 'Smartwatches':
        return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80';
      case 'Accessories':
        return 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80';
      default:
        return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
    }
  };

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-badge">
        {product.isNew && <span className="badge-new">New</span>}
        {product.discount > 0 && <span className="badge-discount">-{product.discount}%</span>}
      </div>
      
      <button 
        className={`wishlist-button ${isWishlisted ? 'active' : ''}`}
        onClick={handleWishlistClick}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <FaHeart />
        <span className="wishlist-tooltip">
          {isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        </span>
      </button>
      
      <Link to={`/product/${product._id}`} className="product-image-link">
        <img 
          src={getProductImage()} 
          alt={product.name} 
          className="product-image" 
          loading="lazy"
        />
        <div className="quick-view">
          <FaEye /> Quick View
        </div>
      </Link>
      
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>
        
        <div className="product-rating">
          {renderStars()}
          <span className="review-count">({product.reviewCount || 0})</span>
        </div>
        
        <div className="product-pricing">
          {product.discount > 0 ? (
            <>
              <span className="original-price">${product.price.toFixed(2)}</span>
              <span className="discounted-price">
                ${(product.price * (1 - product.discount/100)).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="product-price">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
      
      <div className="product-card-actions">
        <button 
          className="add-to-cart btn-primary" 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          aria-label={`Add ${product.name} to cart`}
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;