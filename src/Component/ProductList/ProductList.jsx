import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import './ProductList.css'; // Ensure this file contains the necessary CSS
import { useNavigate } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const fetchProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};

const ProductList = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); 
  const navigate = useNavigate();

  //  using react-query
  const { data: products = [], isLoading, error } = useQuery('products', fetchProducts);

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
  };

  const handleSubmit = () => {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    navigate('/admin');
  };

  // Sort products based on the selected order
  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  return (
    <section className="products">
    
   
    <div className="product-list-container">
    <ScrollToTop 
    smooth 
    top={20} 
    component={<button className="scroll-to-top-button">↑</button>}
  /> 
  <FormControl 
  fullWidth 
  variant="outlined" 
  sx={{
    backgroundColor: 'rgb(54, 6, 87)', 
  
    borderRadius: '10px', 
     marginBottom: '20px', 
    textAlign: 'center', 
  }}
>
  <InputLabel 
    id="sort-label" 
    sx={{ color: '#fff' }} 
  >
    Sort By Price
  </InputLabel>
  <Select
    labelId="sort-label"
    id="sort-select"
    value={sortOrder}
    onChange={handleSortChange}
    label="Sort By Price"
    sx={{ color: '#fff' }} 
  >
    <MenuItem  value="asc">Price: Low to High</MenuItem>
    <MenuItem value="desc">Price: High to Low</MenuItem>
  </Select>
</FormControl>

      {isLoading && <p>Loading products...</p>}
      {error && <p>Error loading products: {error.message}</p>}
      
      <div className="gallery">
        {sortedProducts.map((product, index) => (
          <div
            key={product.id}
            className={`product-item ${index % 6 === 0 ? 'double-column' : index % 6 === 1 ? 'double-row' : ''}`}
          >
            <input
              type="checkbox"
              id={`checkbox-${product.id}`}
              checked={selectedProducts.includes(product.id)}
              onChange={() => handleCheckboxChange(product.id)}
              className="checkbox"
            />
            <label htmlFor={`checkbox-${product.id}`} className="checkbox-label">
              <i className="fas fa-heart"></i>
            </label>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-button">Submit</button>
    </div>
    </section>
  );
};

export default ProductList;
