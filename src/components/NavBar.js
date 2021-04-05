import React from "react";
import {Nav, Navbar} from "react-bootstrap";

const NavBar = () => {
      return(
          <Navbar bg="dark" variant="dark">
              <Nav.Link style={{color: 'white'}} href="/list">Restaurant List</Nav.Link>
              <Nav.Link style={{color: 'white'}} href="/orders">Orders List</Nav.Link>
              <Nav.Link style={{color: 'white'}} href="/profile">Profile</Nav.Link>
          </Navbar>
      )
}

export default NavBar;