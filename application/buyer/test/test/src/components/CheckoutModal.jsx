// CheckoutModal.js
import { useState } from 'react';
import './CheckoutModal.css';
import { FaCreditCard, FaMoneyBillWave, FaTimes } from 'react-icons/fa';
import { BsCreditCard2FrontFill } from 'react-icons/bs';
import { GiTakeMyMoney } from 'react-icons/gi';

function CheckoutModal({ onClose, onSubmit }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentDetails = {
      paymentMethod,
      phone,
      ...(paymentMethod === 'card' && {
        cardNumber,
        cardName,
        expiry,
        cvv
      })
    };
    onSubmit(paymentDetails);
  };

  return (
    <div className="checkout-modal-overlay">
      <div className="checkout-modal">
        <div className="checkout-modal-header">
          <h2>Payment Details</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Enter your phone number"
            />
          </div>

          <div className="payment-options">
            <div 
              className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              <input 
                type="radio" 
                id="card" 
                name="payment" 
                checked={paymentMethod === 'card'}
                onChange={() => {}}
              />
              <label htmlFor="card">
                <span className="payment-icon">
                  <BsCreditCard2FrontFill />
                </span>
                Credit/Debit Card
              </label>
            </div>

            <div 
              className={`payment-option ${paymentMethod === 'cash' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('cash')}
            >
              <input 
                type="radio" 
                id="cash" 
                name="payment" 
                checked={paymentMethod === 'cash'}
                onChange={() => {}}
              />
              <label htmlFor="cash">
                <span className="payment-icon">
                  <GiTakeMyMoney />
                </span>
                Cash on Delivery
              </label>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <div className="payment-details">
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cardName">Cardholder Name</label>
                <input
                  type="text"
                  id="cardName"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                  placeholder="Name on card"
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="expiry">Expiry Date</label>
                  <input
                    type="text"
                    id="expiry"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    required
                    placeholder="MM/YY"
                  />
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="submit-order-btn btn-primary">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;