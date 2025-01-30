import React from 'react';
import shutdownImage from '../../../images/close-button_icon-icons.com_72803.png'
const ShutdownButton = ({ onClick, isLoading }) => {
  return (
    <button 
      onClick={onClick} 
      className={`action-button ${isLoading ? 'loading' : ''}`}
      disabled={isLoading}
    >
      <img src={shutdownImage} alt="Shutdown" />
    </button>
  );
};

export default ShutdownButton;