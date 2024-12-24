// CategoryProducts.js
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Box, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Button } from "@mui/material";

const fetchCategoryProducts = async (category) => {
  const { data } = await axios.get(`https://dummyjson.com/products/category/${category}`);
  return data.products;
};

const CategoryProducts = () => {
  const { category } = useParams(); // Get category from route params

  const { data, isLoading, isError } = useQuery(
    ["categoryProducts", category],
    () => fetchCategoryProducts(category)
  );

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" align="center" mt={4}>
        Failed to load products. Please try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ mb: 5, color: "#3f51b5", textTransform: "capitalize" }}>
        Products in "{category}"
      </Typography>
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
                <Link to={`/product/${product.id}`}><Button variant="outlined" color="primary" sx={{ mt: 3 }}>View Details</Button></Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryProducts;
