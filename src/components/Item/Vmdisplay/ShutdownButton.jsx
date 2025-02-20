import React from 'react';
import shutdownImage from '../../../images/close-button_icon-icons.com_72803.png';

const ShutdownButton = ({ onClick, isLoading, vm_id, disabled }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleClick = async () => {
    if (window.confirm("Вы уверены, что хотите выключить?")) {
      console.log(vm_id);
      
      const requestData = {
        vm_id: String(vm_id),
        action: "shutdown"
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
      title="Выключить"
      onClick={handleClick} 
      className={`action-button ${isLoading ? 'loading' : ''} ${disabled ? 'disabled-button' : ''}`}
      disabled={isLoading || disabled} 
    >
      <img src={shutdownImage} alt="Shutdown" />
    </button>
  );
};

export default ShutdownButton;