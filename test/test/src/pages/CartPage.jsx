import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import CheckoutModal from '../components/CheckoutModal';
import './CartPage.css';

function CartPage({ cartItems, removeFromCart }) {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = (paymentDetails) => {
    console.log('Order placed with:', paymentDetails);
    setShowCheckoutModal(false);
    alert('Order placed successfully!');
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="container">
          <h1 className="heading">Your Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <Link to="/home" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="cart-item-image" 
                    />
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="remove-item"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <h3>Total: ${total.toFixed(2)}</h3>
                <button 
                  className="checkout-btn"
                  onClick={() => setShowCheckoutModal(true)}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />

      {showCheckoutModal && (
        <CheckoutModal
          onClose={() => setShowCheckoutModal(false)}
          onSubmit={handleCheckout}
        />
      )}
    </div>
  );
}

export default CartPage;
