import React from 'react';
import startImage from '../../../images/play-button_icon-icons.com_53922.png'
const StartButton = ({ onClick, isLoading }) => {
  return (
    <button 
      onClick={onClick} 
      className={`action-button ${isLoading ? 'loading' : ''}`}
      disabled={isLoading}
    >
      <img src={startImage} alt="Start" />
    </button>
  );
};

export default StartButton;