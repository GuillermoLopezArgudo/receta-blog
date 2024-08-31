import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RecipeListPage.css'; // Importar el CSS

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica si el usuario está logueado (es decir, si existe un token en localStorage)
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Si hay un token, isLoggedIn será true

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

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRecipes(recipes.filter(recipe => recipe._id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="recipe-list-container">
      <h1>Lista de Recetas</h1>
      {isLoggedIn && (
        <Link to="/create-recipe" className="btn btn-success mb-3">Crear Nueva Receta</Link>
      )}
      <div className="recipe-grid">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
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
                {isLoggedIn && (
                  <>
                    <Link to={`/edit-recipe/${recipe._id}`} className="btn btn-primary">Modificar</Link>
                    <button 
                      onClick={() => handleDelete(recipe._id)} 
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </>
                )}
                <Link to={`/recipe/${recipe._id}`} className="btn btn-secondary">Ver</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default RecipeListPage;
