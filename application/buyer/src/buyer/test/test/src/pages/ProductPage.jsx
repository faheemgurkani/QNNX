import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import ProductDetails from '../components/ProductDetails';

function ProductPage({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          throw new Error('Product ID is missing');
        }
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="app-container">
      <main className="main-content">
        <ProductDetails product={product} addToCart={addToCart} />
      </main>
    </div>
  );
}

export default ProductPage;
