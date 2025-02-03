import React from 'react';
import resetImage from '../../../images/reset_hard_icon_246243.png'
const ResetButton = ({ onClick, isLoading }) => {
  return (
    <button 
      onClick={onClick} 
      className={`action-button ${isLoading ? 'loading' : ''}`}
      disabled={isLoading}
    >
      <img src={resetImage} alt="Reset" />
    </button>
  );
};

export default ResetButton;