import React from 'react';
import destroyImage from '../../../images/trashcan_delete_remove_trash_icon_178327.png';

const DestroyButton = ({ onClick, isLoading }) => {
  const handleClick = () => {
    if (window.confirm("Вы уверены, что хотите уничтожить?")) {
      onClick();
    }
  };

  return (
    <button 
      title="Уничтожить"
      onClick={handleClick} 
      className={`action-button ${isLoading ? 'loading' : ''}`}
      disabled={isLoading}
    >
      <img src={destroyImage} alt="Destroy" />
    </button>
  );
};

export default DestroyButton;