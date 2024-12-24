// Category.js
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Box, List, ListItem, ListItemText, Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

// Function to fetch categories
const fetchCategories = async () => {
  const { data } = await axios.get("https://dummyjson.com/products/category-list");
  return data;
};

const Category = () => {
  const { data, isLoading, isError } = useQuery("categories", fetchCategories);

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
        Failed to load categories. Please try again later.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        borderRight: "1px solid #ddd",
        p: 2,
        boxSizing: "border-box",
        position: "sticky",
        top: 0,
        overflowY: "auto",
        backgroundColor: "#8B5DFF",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: "darkblue" }}>
        Categories
      </Typography>
      <List>
        {data.map((category) => (
          <ListItem button key={category} component={Link} to={`/category/${category}`}>
            <ListItemText primary={category} sx={{ textTransform: "capitalize", color: "white" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Category;



