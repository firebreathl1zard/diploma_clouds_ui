import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import SSHkey from './SSHkey';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleProfile = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log("User  logged out");
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={toggleProfile} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <img width='30px' height='30px' src='https://icon-icons.com/icons2/3298/PNG/512/ui_user_profile_avatar_person_icon_208734.png' alt="Profile Icon" />
      </div>
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '40px', 
          right: '0', 
          marginTop: '10px',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: 'white',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column', // Изменение на вертикальное расположение
          alignItems: 'flex-start' // Выравнивание по левому краю
        }}>
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <button style={{ marginBottom: '10px' }}>Projects</button>
          </Link>
          <SSHkey/>
          <button onClick={handleLogout} style={{ marginTop: '10px' }}>
            Выйти
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;