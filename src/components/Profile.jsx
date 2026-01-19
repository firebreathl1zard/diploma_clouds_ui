import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import SSHkey from './SSHkey';
import AdminButton from './adminbtn/AdminButton';
import profileImage from '../images/profile-btn.png';
import { useDispatch } from 'react-redux';
import { unauthorized } from '../pages/authSlice';
import { setUserData } from './userSlice';


const Profile = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserDataState] = useState({ login: '', role: '' });
  const dispatch = useDispatch();

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
      dispatch(unauthorized());

      // localStorage.removeItem('items');
      localStorage.clear();

      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/v1/user/login`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserDataState({ login: data.userlogin, role: data.userRole }); 
        dispatch(setUserData({ login: data.userlogin, role: data.userRole }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [apiUrl]);


  return (
    <div style={{ position: 'relative' }}>
      <div onClick={toggleProfile} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onMou>
        <img width='30px' height='30px' src={profileImage} alt="Profile Icon" />
      </div>
      {isOpen && (
        <div 
        onMouseLeave={toggleProfile}
        style={{
          position: 'absolute',
          top: '-10px', 
          right: '-10px', 
          width: '300px',
          height: 'auto',
          marginTop: '10px',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '30px',
          backgroundColor: '#292739',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'flex-start' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px auto' ,color: 'white' }}>
            <div style={{ marginRight: '20px' }}>
              <strong>Login:</strong> {userData.login}
            </div>
            <div>
              <strong>Role:</strong> {userData.role}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', margin: '20px auto' }}>
            <SSHkey />
            {userData.login === "a999" && <AdminButton />}
            <button 
                  onClick={handleLogout} 
                  style={{
                      marginTop: '0px',
                      width: '224px',
                      height: '40px',
                      backgroundColor: '#534F73',
                      borderRadius: '14px',
                      color: 'white',
                      transition: 'background-color 0.3s, color 0.3s' 
                  }} 
                  onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#C0C9FF'; 
                      e.currentTarget.style.color = '#4937D8'; 
                  }} 
                  onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#534F73'; 
                      e.currentTarget.style.color = 'white'; 
                  }}
              >
                  Выйти
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;