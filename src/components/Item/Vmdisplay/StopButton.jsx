import React from 'react';
import stopImage from '../../../images/iconfinder-pause-stop-button-player-music-4593160_122283.png';

const StopButton = ({ onClick, isLoading, vm_id, disabled }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleClick = async () => {
    if (window.confirm("Вы уверены, что хотите остановить?")) {
      console.log(vm_id);
      
      const requestData = {
        vm_id: String(vm_id),
        action: "stop"
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
      title="Остановить"
      onClick={handleClick} 
      className={`action-button ${isLoading ? 'loading' : ''} ${disabled ? 'disabled-button' : ''}`}
      disabled={isLoading || disabled} 
    >
      <img src={stopImage} alt="Stop" />
    </button>
      );
    };

export default StopButton;
