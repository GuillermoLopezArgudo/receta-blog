// Verifica si el usuario está autenticado
export const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Devuelve true si el token existe
  };
  
  // Obtiene el token del almacenamiento local
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Establece el token en el almacenamiento local
  export const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Elimina el token del almacenamiento local
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  