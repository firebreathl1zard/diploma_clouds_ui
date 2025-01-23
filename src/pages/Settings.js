import React from 'react';
import Profile from '../components/Profile';
import '../styles/HomePages.css'
import SSHkey from '../components/SSHkey';

const Settings = () => {
  

  return (
    <div>
        <SSHkey/>
        <div className="profile-container">
            <Profile />
        </div>
    </div>
  );
};

export { Settings };