import React, { useState } from 'react';
import startImage from '../../../images/play-button_icon-icons.com_53922.png';

const StartButton = ({onClick, isLoading, vm_id, disabled }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleClick = async () => {
    if (window.confirm("Вы уверены, что хотите запустить?")) {
      console.log(vm_id);
      
      const requestData = {
        vm_id: String(vm_id),
        action: "start"
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
      title="Включить"
      onClick={handleClick} 
      className={`action-button ${isLoading ? 'loading' : ''} ${disabled ? 'disabled-button' : ''}`}
      disabled={isLoading || disabled} 
    >
      <img src={startImage} alt="Start" />
    </button>
      );
    };
export default StartButton;