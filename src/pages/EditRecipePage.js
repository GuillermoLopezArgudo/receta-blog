// src/pages/EditRecipePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditRecipePage.css'; // Asegúrate de crear este archivo CSS

const EditRecipePage = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setTitle(data.title);
        setIngredients(data.ingredients.join('\n'));
        setInstructions(data.instructions);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/recipes/${id}`, {
        title,
        ingredients: ingredients.split('\n'),
        instructions,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/recipes');
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <div className="edit-recipe-container">
      <h1>Modifica la Receta</h1>
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label htmlFor="title">Nombre Receta </label>
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
          <label htmlFor="instructions">Pasos a seguir</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows="5"
            required
          />
        </div>
        <button type="submit" className="submit-button">Update Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipePage;
