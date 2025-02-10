import React from 'react';
import resetImage from '../../../images/reset_hard_icon_246243.png';

const ResetButton = ({ onClick, isLoading, vm_id }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleClick = async () => {
    if (window.confirm("Вы уверены, что хотите сбросить?")) {
      console.log(vm_id);
      
      const requestData = {
        vm_id: String(vm_id),
        action: "reset"
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