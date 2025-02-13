import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginSuccess, unauthorized } from './authSlice';

function AuthorizationPages({ setData }) { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState(''); 
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (status === 'Login successful') {
      navigate('/workflow');
    }
  }, [status, navigate]);

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!username || !password) {
      setError('Пожалуйста, введите имя пользователя и пароль.');
      setSuccessMessage('');
      return;
    }
  
    try {
      const response = await fetch(`${apiUrl}/v2/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
  
      const data = await response.json();

      if (!response.ok) {
        if (data.message) {
          setError(data.message);
        } else {
          setError('Ошибка авторизации');
        }
        setSuccessMessage('');
        dispatch(unauthorized());
        return;
      }

      setToken(data.token);
      setSuccessMessage('Успешная авторизация!');
      dispatch(loginSuccess());
      setError('');
      setData(data); 
      navigate('/workflow'); 
    } catch (error) {
      console.error('Ошибка:', error);
      setError('Произошла ошибка при авторизации.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="auth-container"> 
      <div className="auth-form">
        <h2>Авторизация</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Имя пользователя:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Имя пользователя"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
            />
          </div>
          <button type="submit">Войти</button>
          {error && <p className="error">{error}</p>} 
          {successMessage && <p className="success">{successMessage}</p>} 
        </form>
      </div>
    </div>
  );
}

export { AuthorizationPages };