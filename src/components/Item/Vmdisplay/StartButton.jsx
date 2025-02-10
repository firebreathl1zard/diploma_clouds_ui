import React, { useState } from 'react';
import startImage from '../../../images/play-button_icon-icons.com_53922.png';

const StartButton = ({onClick, isLoading, vm_id }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleClick = async () => {
    if (window.confirm("Вы уверены, что хотите запустить?")) {
      console.log(vm_id);
      
      // Создаем объект с данными для отправки
      const requestData = {
        vm_id: String(vm_id),
        action: "start"
      };

      try {
        // Отправляем POST-запрос
        const response = await fetch(`${apiUrl}/v1/vm/action`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(requestData),
        });

        // Проверяем, успешен ли запрос
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Вызываем onClick, если нужно
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
      className={`action-button ${isLoading ? 'loading' : ''}`}
      disabled={isLoading}
    >
      <img src={startImage} alt="Start" />
    </button>
      );
    };
export default StartButton;