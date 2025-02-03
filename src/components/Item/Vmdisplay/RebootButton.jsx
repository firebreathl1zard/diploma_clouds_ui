import React from 'react';
import rebootImage from '../../../images/reload_icon-icons.com_69600.png';

const RebootButton = ({ onClick, isLoading }) => {
  const handleClick = () => {
    if (window.confirm("Вы уверены, что хотите перезагрузить?")) {
      onClick();
    }
  };

  return (
    <button 
      title="Перезагрузить"
      onClick={handleClick} 
      className={`action-button ${isLoading ? 'loading' : ''}`}
      disabled={isLoading}
    >
      <img src={rebootImage} alt="Reboot" />
    </button>
  );
};

export default RebootButton;