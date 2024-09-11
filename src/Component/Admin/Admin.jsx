import React from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { Button, Card, CardContent, Typography, IconButton, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ScrollToTop from 'react-scroll-to-top';
import './Admin.css';


const fetchProductDetails = async (productIds) => {
  const productDetailsPromises = productIds.map((productId) =>
    axios.get(`https://fakestoreapi.com/products/${productId}`)
  );
  const responses = await Promise.all(productDetailsPromises);
  return responses.map((response) => response.data);
};

const Admin = () => {
  const queryClient = useQueryClient();

  const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

 
  const { data: productsDetails = [], isLoading, error } = useQuery(
    ['productDetails', selectedProducts],
    () => fetchProductDetails(selectedProducts),
    {
      enabled: selectedProducts.length > 0,
    }
  );


  const totalPrice = productsDetails.reduce((acc, product) => {
    return acc + (product.price * (product.quantity || 1));
  }, 0);

  
  const handleQuantityChange = (productId, change) => {
    queryClient.setQueryData(['productDetails', selectedProducts], (oldDetails) =>
      oldDetails.map(product =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, (product.quantity || 1) + change) }
          : product
      )
    );
  };

 
  const handleDeleteProduct = (productId) => {

    const updatedSelectedProducts = selectedProducts.filter(id => id !== productId);
    localStorage.setItem('selectedProducts', JSON.stringify(updatedSelectedProducts));

   
    queryClient.setQueryData(['productDetails', updatedSelectedProducts], (oldDetails) => {
      if (!oldDetails) {
        return []; 
      }
      return oldDetails.filter(product => product.id !== productId);
    });

    queryClient.invalidateQueries(['productDetails', updatedSelectedProducts]);
  };

  return (
    <section className="products">
      <div className="product-item container">
        <ScrollToTop
          smooth
          top={20}
          component={<button className="scroll-to-top-button">↑</button>}
        />
        <Typography variant="h4" gutterBottom align="center">Admin Review</Typography>
        {isLoading && <CircularProgress />}
        {error && <Typography color="error">Error loading products: {error.message}</Typography>}
        {productsDetails.length === 0 ? (
          <Typography align="center">No products selected.</Typography>
        ) : (
          <div className="row">
            {productsDetails.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <Card>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-img"
                  />
                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography variant="body1" color="textSecondary">${product.price}</Typography>
                    <Typography variant="body2" color="textSecondary">{product.description}</Typography>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div>
                        <IconButton
                          color="primary"
                          onClick={() => handleQuantityChange(product.id, -1)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography component="span">{product.quantity || 1}</Typography>
                        <IconButton
                          color="primary"
                          onClick={() => handleQuantityChange(product.id, 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            <div className="mt-4 text-center bg-dark">
              <Typography variant="h5">Total Price: ${totalPrice.toFixed(2)}</Typography>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Admin;
