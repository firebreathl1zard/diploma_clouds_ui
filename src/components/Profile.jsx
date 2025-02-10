import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import SSHkey from './SSHkey';
import profileImage from '../images/ui_user_profile_avatar_person_icon_208734.png'

const Profile = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isOpen, setIsOpen] = useState(false);

  const toggleProfile = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiUrl}/v1/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log("User logged out");
      // localStorage.removeItem('token');
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={toggleProfile} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <img width='30px' height='30px' src={profileImage} alt="Profile Icon" />
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
          flexDirection: 'column', 
          alignItems: 'flex-start' 
        }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
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