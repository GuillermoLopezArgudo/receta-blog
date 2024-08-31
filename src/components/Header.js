import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Asegúrate de tener este archivo CSS

const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem('token'));

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header">
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <img
          src={require('../assets/LogoHeader.png')}
          alt="Recipe Book"
          className="logo"
        />
        <span className="ml-2">Recipe Book</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/recipes">Recetas</Nav.Link>
          {isLoggedIn ? (
            <>
              <Nav.Link as={Link} to="/profile">Perfil</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
