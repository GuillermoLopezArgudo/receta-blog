import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css'; // Asegúrate de que la ruta al archivo CSS sea correcta

const Header = () => {
  return (
    <Navbar expand="lg" className="header">
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <img
          src={require('../assets/LogoHeader.png')} // Asegúrate de que la ruta al logo sea correcta
          alt="Recipe Book"
          className="logo"
        />
        <span className="brand-name">Libro de Recetas</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navbar-nav">
          <Nav.Link as={Link} to="/recipes">Recetas</Nav.Link>
          <Nav.Link as={Link} to="/create-recipe">Crear Recetas</Nav.Link>
          <Nav.Link as={Link} to="/login">Iniciar Sesion</Nav.Link>
          <Nav.Link as={Link} to="/register">Registrate</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
