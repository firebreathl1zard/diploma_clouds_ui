import React from 'react';
import destroyImage from '../../../images/trashcan_delete_remove_trash_icon_178327.png'
const DestroyButton = ({ onClick, isLoading }) => {
  return (
    <button 
      onClick={onClick} 
      className={`action-button ${isLoading ? 'loading' : ''}`}
      disabled={isLoading}
    >
      <img src={destroyImage} alt="Destroy" />
    </button>
  );
};

export default DestroyButton;