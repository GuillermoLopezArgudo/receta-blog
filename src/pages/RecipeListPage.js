// src/pages/RecipeListPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RecipeListPage.css'; // Asegúrate de crear este archivo CSS

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipe-list-container">
      <h1>Lista de Recetas</h1>
      <div className="recipe-grid">
        {recipes.map(recipe => (
          <div key={recipe._id} className="recipe-card">
            <h2>{recipe.title}</h2>
            <p><strong>Creador:</strong> {recipe.author}</p>
            <p><strong>Ingredientes:</strong></p>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <p><strong>Pasos a Seguir:</strong></p>
            <p>{recipe.instructions}</p>
            <div className="recipe-actions">
              <Link to={`/edit-recipe/${recipe._id}`} className="btn btn-primary">Modificar</Link>
              <Link to={`/recipe/${recipe._id}`} className="btn btn-secondary">Ver</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeListPage;
