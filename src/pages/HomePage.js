// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Asegúrate de crear este archivo CSS

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Bienbenido al Libro de Recetas</h1>
        <p>Your favorite place to find and share delicious recipes!</p>
        <div className="cta-buttons">
          <Link to="/recipes" className="cta-button">Ver Recetas</Link>
          <Link to="/login" className="cta-button">Iniciar Sesión</Link>
          <Link to="/register" className="cta-button">Registrate</Link>
        </div>
      </div>
      <div className="featured-section">
        <h2>Featured Recipes</h2>
        <p>Discover some of our favorite recipes from our community.</p>
        {/* Aquí podrías agregar un componente para mostrar recetas destacadas */}
      </div>
    </div>
  );
};

export default HomePage;
