// AuthCard.js
import { useState } from 'react';
import axios from '../utils/axiosInstance';
import './AuthCard.css';

function AuthCard({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleMode = () => {
    setError('');
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { 
            name: formData.name, 
            email: formData.email, 
            password: formData.password 
          };

      const res = await axios.post(endpoint, payload);
      onLogin(res.data.token, res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <p className="auth-subtitle">
        {isLogin ? 'Welcome back to QNXX Shop' : 'Create your QNXX Shop account'}
      </p>

      <div className="social-buttons">
        <button type="button" className="social-button google">
          <span className="social-icon"></span>
          Continue with Google
        </button>
        <button type="button" className="social-button phone">
          <span className="social-icon"></span>
          Continue with Mobile
        </button>
      </div>

      <div className="divider">
        <span>or</span>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input 
            type="text" 
            name="name"
            placeholder="Full Name" 
            required 
            value={formData.name}
            onChange={handleChange}
          />
        )}
        <input 
          type="email" 
          name="email"
          placeholder="Email Address" 
          required 
          value={formData.email}
          onChange={handleChange}
        />
        <input 
          type="password" 
          name="password"
          placeholder="Password" 
          required 
          value={formData.password}
          onChange={handleChange}
          minLength="6"
        />
        {!isLogin && (
          <input 
            type="password" 
            name="confirmPassword"
            placeholder="Confirm Password" 
            required 
            value={formData.confirmPassword}
            onChange={handleChange}
            minLength="6"
          />
        )}
        {error && <p className="error-message">{error}</p>}
        <button 
          className={`submit-btn ${loading ? 'loading' : ''}`} 
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="btn-loader"></span>
          ) : isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button type="button" onClick={toggleMode} className="toggle-button">
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default AuthCard;