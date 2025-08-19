import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import CheckoutModal from '../components/CheckoutModal';
import './CartPage.css';

function CartPage({ cartItems, removeFromCart }) {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = async (paymentDetails) => {
    try {
      await axios.post('/api/orders', {
        paymentMethod: paymentDetails.paymentMethod,
        phone: paymentDetails.phone,
        ...(paymentDetails.paymentMethod === 'card' && {
          cardNumber: paymentDetails.cardNumber,
          cardName: paymentDetails.cardName,
          expiry: paymentDetails.expiry,
          cvv: paymentDetails.cvv
        })
      });
      
      setShowCheckoutModal(false);
      alert('Order placed successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to place order');
    }
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
                {cartItems.map((item) => (
                  <div key={item._id} className="cart-item">
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
                      onClick={() => removeFromCart(item._id)}
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
