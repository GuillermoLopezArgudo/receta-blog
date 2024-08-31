import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/'); // Redirige a la página de inicio después de cerrar sesión
  };

  return (
    <button onClick={handleLogout}>Cerrar sesión</button>
  );
};

export default Logout;
