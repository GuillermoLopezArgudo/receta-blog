// src/pages/RecipeDetailPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RecipeDetailPage.css'; // Asegúrate de crear este archivo CSS

const RecipeDetailPage = () => {
  const { id } = useParams(); // Obtén el ID de la receta desde la URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <p>Cargando receta...</p>; // Mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="recipe-detail-container">
      <h1>{recipe.title}</h1>
      <p><strong>Creador:</strong> {recipe.author}</p>
      <p><strong>Ingredientes:</strong></p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p><strong>Pasos a Seguir:</strong></p>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetailPage;
