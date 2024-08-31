import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateRecipePage from './pages/CreateRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import ProfilePage from './pages/ProfilePage'; // Importa el ProfilePage
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-recipe" element={<CreateRecipePage />} />
        <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
        <Route path="/recipes" element={<RecipeListPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* Ruta para el perfil */}
      </Routes>
    </Router>
  );
}

export default App;
