import React from 'react';
import destroyImage from '../../../images/trashcan_delete_remove_trash_icon_178327.png';

const DestroyButton = ({ onClick, isLoading,vm_id }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleClick = async () => {
    if (window.confirm("Вы уверены, что хотите уничтожить?")) {
      console.log(vm_id);
      
      const requestData = {
        vm_id: String(vm_id),
        action: "destroy"
      };

      try {
        const response = await fetch(`${apiUrl}/v1/vm/action`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        onClick();
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      }
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