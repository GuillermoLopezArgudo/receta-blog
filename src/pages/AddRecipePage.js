import React, { useState } from 'react';
import axios from 'axios';

const AddRecipePage = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No user token found in localStorage');
      }

      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        throw new Error('No user email found in localStorage');
      }

      const recipe = {
        title,
        ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
        instructions,
        author: userEmail,
      };

      await axios.post('http://localhost:5000/api/recipes', recipe, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.href = '/recipes'; // Redirigir a la página de recetas
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div>
      <h1>Añadir Receta</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Ingredientes (separados por comas):</label>
          <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </div>
        <div>
          <label>Instrucciones:</label>
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        </div>
        <button type="submit">Añadir Receta</button>
      </form>
    </div>
  );
};

export default AddRecipePage;
