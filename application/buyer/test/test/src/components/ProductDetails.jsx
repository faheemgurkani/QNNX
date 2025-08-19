import { Link } from 'react-router-dom';
import './ProductDetails.css';
import { FaShoppingCart, FaHeart, FaStar, FaRegStar, FaChevronLeft } from 'react-icons/fa';
import { useState } from 'react';

function ProductDetails({ product, addToCart, addToWishlist, isInWishlist }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
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

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
    addToWishlist(product._id);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  return (
    <div className="product-details-container">
      <div className="breadcrumb">
        <Link to="/products" className="breadcrumb-link">
          <FaChevronLeft className="breadcrumb-icon" /> Back to Products
        </Link>
      </div>
      
      <div className="product-details">
        <div className="product-gallery">
          <div className="main-image-container">
            <img 
              src={product.images?.[selectedImage] || product.image} 
              alt={product.name} 
              className="main-image" 
            />
          </div>
          <div className="thumbnail-container">
            {product.images?.map((img, index) => (
              <button
                key={index}
                className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
                aria-label={`View product image ${index + 1}`}
              >
                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
        
        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-meta">
              <div className="product-rating">
                {renderStars()}
                <span className="review-count">({product.reviewCount || 0} reviews)</span>
              </div>
              <span className="product-sku">SKU: {product.sku || 'N/A'}</span>
            </div>
          </div>
          
          <div className="product-pricing">
            {product.discount > 0 ? (
              <>
                <span className="original-price">${product.price.toFixed(2)}</span>
                <span className="discounted-price">
                  ${(product.price * (1 - product.discount/100)).toFixed(2)}
                </span>
                <span className="discount-badge">Save {product.discount}%</span>
              </>
            ) : (
              <span className="product-price">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="product-features">
            <h3>Key Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn" 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button 
                  className="quantity-btn" 
                  onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="action-buttons">
              <button 
                className="add-to-cart-btn btn-primary"
                onClick={() => {
                  const productWithQuantity = { ...product, quantity };
                  addToCart(productWithQuantity);
                }}
                aria-label={`Add ${quantity} ${product.name} to cart`}
              >
                <FaShoppingCart /> Add to Cart
              </button>
              
              <button 
                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={handleWishlistClick}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <FaHeart /> {isWishlisted ? 'In Wishlist' : 'Wishlist'}
              </button>
            </div>
          </div>
          
          <div className="product-specs">
            <h3>Specifications</h3>
            <table>
              <tbody>
                {product.specifications?.map((spec, index) => (
                  <tr key={index}>
                    <th>{spec.key}</th>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;