import React from 'react';
import resetImage from '../../../images/reset_hard_icon_246243.png';

const ResetButton = ({ onClick, isLoading }) => {
  const handleClick = () => {
    if (window.confirm("Вы уверены, что хотите сбросить?")) {
      onClick();
    }
  };

  return (
    <button 
      title="Сбросить"
      onClick={handleClick} 
      className={`action-button ${isLoading ? 'loading' : ''}`}
      disabled={isLoading}
    >
      <img src={resetImage} alt="Reset" />
    </button>
  );
};

export default ResetButton;