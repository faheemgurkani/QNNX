import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './SearchResultsPage.css';

function SearchResultsPage({ results, loading, addToCart }) {
  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="container">
          <h1 className="heading">Search Results</h1>
          {results.length === 0 ? (
            <div className="no-results">
              <p>No products found matching your search</p>
              <Link to="/home" className="continue-shopping">
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="product-grid">
              {results.map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  addToCart={addToCart} 
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SearchResultsPage;
