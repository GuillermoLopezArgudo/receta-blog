// src/pages/CreateRecipePage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateRecipePage.css'; // Asegúrate de crear este archivo CSS

const CreateRecipePage = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/recipes', {
        title,
        ingredients: ingredients.split('\n'),
        instructions,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/recipes');
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <div className="create-recipe-container">
      <h1>Guarda La Nueva Receta</h1>
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label htmlFor="title">Nombre Receta</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredientes (uno por linea)</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="5"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Pasos a Seguir</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows="5"
            required
          />
        </div>
        <button type="submit" className="submit-button">Guardar Receta</button>
      </form>
    </div>
  );
};

export default CreateRecipePage;
