import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <Button
          component={Link}
          to="/"
          color="inherit"
          sx={{ marginRight: 2, mx: "auto", display: "flex", justifyContent: "center" }}
        >
          Products
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
