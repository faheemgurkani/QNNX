import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const dummyProducts = [
  { 
    id: 1, 
    name: 'Premium Laptop', 
    price: 1299.99, 
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Powerful laptop with Intel Core i9 processor, 32GB RAM, 1TB SSD, and 15.6" 4K display.',
    features: [
      'Intel Core i9-11900H processor',
      '32GB DDR4 RAM',
      '1TB NVMe SSD',
      'NVIDIA RTX 3080 16GB',
      '15.6" 4K OLED display'
    ]
  },
  { 
    id: 2, 
    name: 'Smartphone Pro', 
    price: 799.99, 
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Flagship smartphone with triple camera system, 120Hz AMOLED display, and all-day battery life.',
    features: [
      '6.7" AMOLED 120Hz display',
      'Triple 50MP camera system',
      '5000mAh battery',
      'Snapdragon 8 Gen 2',
      '256GB storage'
    ]
  },
  { 
    id: 3, 
    name: 'Wireless Headphones', 
    price: 249.99, 
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.2',
      'Built-in microphone',
      'Foldable design'
    ]
  },
  { 
    id: 4, 
    name: 'Smart Watch', 
    price: 299.99, 
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Advanced smartwatch with health monitoring, GPS, and always-on display.',
    features: [
      '1.4" AMOLED display',
      'Heart rate monitoring',
      'Blood oxygen sensor',
      'GPS tracking',
      '7-day battery life'
    ]
  },
  { 
    id: 5, 
    name: 'Bluetooth Speaker', 
    price: 129.99, 
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Portable Bluetooth speaker with 20-hour playtime and 360° sound.',
    features: [
      '20-hour battery life',
      'IP67 waterproof',
      '360° sound',
      'Bluetooth 5.0',
      'Built-in microphone'
    ]
  },
  { 
    id: 6, 
    name: '4K Television', 
    price: 899.99, 
    image: 'https://images.unsplash.com/photo-1571415060716-baff5f717c37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: '55" 4K UHD Smart TV with HDR and Dolby Vision for stunning picture quality.',
    features: [
      '55" 4K UHD display',
      'HDR10+ and Dolby Vision',
      'Smart TV platform',
      'Voice remote',
      'Dolby Atmos sound'
    ]
  }
];

function HomePage({ cart, addToCart }) {
  return (
    <div className="app-container">
      <main className="main-content">
        <div className="container">
          <h1 className="heading">Featured Products</h1>
          <div className="product-grid">
            {dummyProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                addToCart={addToCart} 
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
