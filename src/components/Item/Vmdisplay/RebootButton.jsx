import React from 'react';
import rebootImage from '../../../images/reload_icon-icons.com_69600.png';

const RebootButton = ({ onClick, isLoading,vm_id, disabled }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleClick = async () => {
    if (window.confirm("Вы уверены, что хотите перезапустить?")) {
      console.log(vm_id);
      
      const requestData = {
        vm_id: String(vm_id),
        action: "reboot"
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
      title="Перезапустить"
      onClick={handleClick} 
      className={`action-button ${isLoading ? 'loading' : ''} ${disabled ? 'disabled-button' : ''}`}
      disabled={isLoading || disabled} 
    >
      <img src={rebootImage} alt="Reboot" />
    </button>
  );
};

export default RebootButton;