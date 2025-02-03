import React from 'react';
import shutdownImage from '../../../images/close-button_icon-icons.com_72803.png';

const ShutdownButton = ({ onClick, isLoading }) => {
  const handleClick = () => {
    if (window.confirm("Вы уверены, что хотите выключить?")) {
      onClick();
    }
  };

  return (
    <button 
      title="Выключить"
      onClick={handleClick} 
      className={`action-button ${isLoading ? 'loading' : ''}`}
      disabled={isLoading}
    >
      <img src={shutdownImage} alt="Shutdown" />
    </button>
  );
};

export default ShutdownButton;