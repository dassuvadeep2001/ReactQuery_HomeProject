import React from 'react'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import Header from '../layout/header/header'
import Footer from '../layout/footer/footer'
import { Grid } from "@mui/material";
import Allproducts from '../component/product/allproduct';
import Category from '../component/category/category'
import CategoryProducts from '../component/categoryproduct/categoryproduct';
import ProductDetails from '../component/details/details';


function Routing() {
  return (
    <Router>
      <Header/>
        <Routes>
        <Route
          path=""
          element={
            <Grid container spacing={2}>
               {/* Product List Section */}
                <Grid item xs={2} sm={2} md={2}>
                <Category/>
              </Grid>
              {/* Product List Section */}
              <Grid item xs={10} sm={10} md={10}>
                <Allproducts/>
              </Grid>
            </Grid>
          }
        />
        <Route
          path="/category/:category"
          element={
            <Grid container spacing={2}>
               {/* Product List Section */}
                <Grid item xs={2} sm={2} md={2}>
                <Category/>
              </Grid>
              {/* Product List Section */}
              <Grid item xs={10} sm={10} md={10}>
                <CategoryProducts/>
              </Grid>
            </Grid>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Grid container spacing={2}>
               {/* Product List Section */}
                <Grid item xs={2} sm={2} md={2}>
                <Category/>
              </Grid>
              {/* Product List Section */}
              <Grid item xs={10} sm={10} md={10}>
                <ProductDetails/>
              </Grid>
            </Grid>
          }
        />
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
        </Routes>
        <Footer/>
    </Router>
  )
}

export default Routing