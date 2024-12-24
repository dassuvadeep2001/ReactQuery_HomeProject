import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Grid, Button } from '@mui/material';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchProductDetails = async (id) => {
  const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
  return data;
};

const ProductDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery(['product', id], () => fetchProductDetails(id), {
    enabled: !!id, // Ensures the query only runs when `id` exists
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography color="error">Error fetching product details</Typography>
      </Box>
    );
  }

  const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images, weight, dimensions,
    warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, minimumOrderQuantity
   } = data;

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={thumbnail}
            alt={title}
            sx={{
              width: '400px',
              height: '400px',
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            {images.map((image, index) => (
              <Box
                key={index}
                component="img"
                src={image}
                alt={`Product ${index}`}
                sx={{
                  width: '80px',
                  height: '80px',
                  borderRadius: 1,
                  objectFit: 'cover',
                  boxShadow: 5,
                }}
              />
            ))}
          </Box>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#3f51b5', mb: 5 }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {description}
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            ${price} <span style={{ textDecoration: 'line-through', color: '#888' }}>${(price / (1 - discountPercentage / 100)).toFixed(2)}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discount: {discountPercentage}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {rating} / 5
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock: {stock}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Brand: {brand}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Weight: {weight}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dimensions: width: {dimensions.width}, height: {dimensions.height}, depth: {dimensions.depth}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Warranty Information: {warrantyInformation}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Shipping Information: {shippingInformation}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Availability Status: {availabilityStatus}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Return Policy: {returnPolicy}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Minimum Order Quantity: {minimumOrderQuantity}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 3 }}>
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
