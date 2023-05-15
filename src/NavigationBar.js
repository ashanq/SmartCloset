import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Dress Location Detection</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/register">New Dress</Nav.Link>
        <Nav.Link as={Link} to="/select-dress">Select Dress</Nav.Link>
        <Nav.Link as={Link} to="/view-dress">View Dress</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
