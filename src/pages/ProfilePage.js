import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'; // Asegúrate de crear este archivo CSS

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUser(data);
        setEmail(data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/users/me/email', { email: newEmail }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Email updated successfully');
      setEmail(newEmail);
    } catch (error) {
      console.error('Error updating email:', error.response?.data?.message || error.message);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
  
    // Verifica que ambas contraseñas estén presentes
    if (!password || !newPassword) {
      alert('Both current and new passwords are required.');
      return;
    }
  
    try {
      // Enviar solicitud para actualizar la contraseña
      const response = await axios.put('http://localhost:5000/api/users/me/password', {
        password, 
        newPassword
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
  
      alert(response.data.message);
      setPassword(''); // Limpiar el campo de la contraseña actual
      setNewPassword(''); // Limpiar el campo de la nueva contraseña
    } catch (error) {
      console.error('Error updating password:', error.response?.data?.message || error.message);
      alert('Failed to update password: ' + (error.response?.data?.message || error.message));
    }
  };
  
  
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <h1>Perfil de Usuario</h1>
      <div className="profile-info">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Nombre:</strong> {user.name}</p>
      </div>
      <div className="profile-actions">
        <h2>Cambiar Email</h2>
        <form onSubmit={handleUpdateEmail}>
          <div className="form-group">
            <label>Nuevo Email:</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Actualizar Email</button>
        </form>
        <h2>Cambiar Contraseña</h2>
        <form onSubmit={handleUpdatePassword}>
          <div className="form-group">
            <label>Contraseña Actual:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Nueva Contraseña:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Actualizar Contraseña</button>
        </form>
      </div>
      <button onClick={handleLogout} className="btn btn-danger mt-3">Cerrar Sesión</button>
    </div>
  );
};

export default ProfilePage;
