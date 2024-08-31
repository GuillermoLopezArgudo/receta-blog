import axios from 'axios';

// Configura la URL base para tu API
const API_URL = 'http://localhost:5000/api';

// Función para iniciar sesión
export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

// Función para obtener las recetas
export const getRecipes = async () => {
  const response = await axios.get(`${API_URL}/recipes`);
  return response.data;
};

// Función para agregar una receta
export const addRecipe = async (recipe) => {
  const response = await axios.post(`${API_URL}/recipes`, recipe);
  return response.data;
};

// Función para obtener el usuario actual (esto es solo un ejemplo, asegúrate de que tu API lo soporte)
export const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/current-user`);
  return response.data;
};
