import  { useState } from 'react';
import './AuthCard.css';
function AuthCard({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(); // 👈 fake login function to switch page
  };

  return (
    <div className="auth-card">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

      <div className="social-buttons">
        <button className="social-button google">Continue with Google</button>
        <button className="social-button phone">Continue with Mobile</button>
      </div>

      <div className="divider">or</div>

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        {!isLogin && <input type="password" placeholder="Confirm Password" required />}
        <button className="submit-btn" type="submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <span onClick={toggleMode}>
          {isLogin ? 'Sign Up' : 'Login'}
        </span>
      </p>
    </div>
  );
}
export default AuthCard;