import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AuthSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userId = params.get('userId');

    if (token && userId) {
      localStorage.setItem('token', token);
      // You might want to fetch user details here or redirect to home
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  return <div>Logging you in...</div>;
}

export default AuthSuccess;