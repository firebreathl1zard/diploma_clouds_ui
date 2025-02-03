import React from 'react';
import rebootImage from '../../../images/reload_icon-icons.com_69600.png'
const RebootButton = ({ onClick, isLoading }) => {
  return (
    <button 
      onClick={onClick} 
      className={`action-button ${isLoading ? 'loading' : ''}`}
      disabled={isLoading}
    >
      <img src={rebootImage} alt="Reboot" />
    </button>
  );
};

export default RebootButton;