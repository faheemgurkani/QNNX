import { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import ProductCard from '../components/ProductCard';

function HomePage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data.products);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="container">
          <h1 className="heading">Featured Products</h1>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                addToCart={addToCart} 
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
