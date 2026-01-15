import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../utils/firebaseUtils';
import { useAppContext } from '../../context/AppContext';
import './Products.css';

const Products = () => {
  // Get basket function from context
  const { addToBasket } = useAppContext();
  // State for products list and filters
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  // Available filter options
  const categories = ['All', 'CPU', 'GPU', 'Cooling', 'RAM', 'Storage', 'Case', 'Motherboard', 'Power Supply'];
  const priceRanges = ['All', 'Under £100', '£100-£200', '£200-£500', '£500-£1000', 'Over £1000'];

  // Fetch products from Firebase on component mount
  useEffect(() => {
    getAllProducts().then(setProducts).catch(console.error).finally(() => setLoading(false));
  }, []);
  // Filter products by category, price range, and search term
  const getPriceFilter = (p) => {
    if (selectedPriceRange === 'All') return true;
    const ranges = { 'Under £100': [0, 100], '£100-£200': [100, 200], '£200-£500': [200, 500], '£500-£1000': [500, 1000], 'Over £1000': [1000, Infinity] };
    const [min, max] = ranges[selectedPriceRange];
    return p.price >= min && p.price < max;
  };
  const filteredProducts = products
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .filter(getPriceFilter)
    .filter(p => !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()));
  // Show loading state while fetching products
  if (loading) return <div className="products-container">Loading...</div>;

  return (
    <div className="products-container">
      {/* Search bar for filtering products by name or description */}
      <div className="search-container">
        <input type="text" placeholder="Search products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="search-input" />
      </div>
      {/* Dropdown filters for category and price range */}
      <div className="filters-container">
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="filter-select">
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select value={selectedPriceRange} onChange={e => setSelectedPriceRange(e.target.value)} className="filter-select">
          {priceRanges.map(range => <option key={range} value={range}>{range}</option>)}
        </select>
      </div>
      {/* Display grid of filtered products */}
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">£{product.price}</span>
                <button className="add-to-cart-btn" onClick={() => addToBasket(product)}>Add to Basket</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
