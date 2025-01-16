

export const saveToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  export const isAuthenticated = () => {
    const token = getToken();
    // Здесь можно добавить проверку на срок действия токена, если это необходимо
    return !!token;
  };