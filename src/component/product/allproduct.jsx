import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

// Fetch products
const fetchProducts = async (searchQuery) => {
  const url = searchQuery
    ? `https://dummyjson.com/products/search?q=${searchQuery}`
    : "https://dummyjson.com/products";
  const response = await axios.get(url);
  return response.data.products;
};

const Allproducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Handle search input with debounce
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);

    // Add debounce for performance
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      setDebouncedQuery(e.target.value);
    }, 300); // Adjust debounce time as needed
  };

  // Fetch products using React Query
  const { data, isLoading, isError } = useQuery(
    ["products", debouncedQuery],
    () => fetchProducts(debouncedQuery),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" align="center" mt={4}>
        Failed to fetch products. Please try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 5, color: "#3f51b5" }}>
        All Products
      </Typography>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: "50%" }}
        />
      </Box>
      {data.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          No products found for "{debouncedQuery}".
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {data.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ height: "auto", boxShadow: 5 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom sx={{ color: "#3f51b5" }}>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="subtitle1" mt={1} sx={{ color: "green" }}>
                    Price: ${product.price}
                  </Typography>
                  <Link to={`/product/${product.id}`}>
                    <Button variant="outlined" color="primary" sx={{ mt: 3 }}>
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Allproducts;
