import React from 'react';
import stopImage from '../../../images/iconfinder-pause-stop-button-player-music-4593160_122283.png';

const StopButton = ({ onClick, isLoading }) => {
  const handleClick = () => {
    if (window.confirm("Вы уверены, что хотите остановить?")) {
      onClick();
    }
  };

  return (
    <button 
      title="Остановить"
      onClick={handleClick} 
      className={`action-button ${isLoading ? 'loading' : ''}`}
      disabled={isLoading}
    >
      <img src={stopImage} alt="Stop" />
    </button>
  );
};

export default StopButton;
