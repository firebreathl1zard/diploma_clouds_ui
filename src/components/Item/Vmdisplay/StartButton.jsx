import React, { useState } from 'react';
import startImage from '../../../images/play-button_icon-icons.com_53922.png';

const StartButton = ({ project_id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (window.confirm("Вы уверены, что хотите запустить?")) {
      setIsLoading(true);
      try {
        // 1. Получаем project_id
        const projectResponse = await fetch('http://ivan.firebreathlizard.space:8000/api/v1/projects');
        if (!projectResponse.ok) {
          throw new Error('Ошибка при получении проектов');
        }
        const projectData = await projectResponse.json();
        
        // 2. Ищем vm_id по project_id
        const vmResponse = await fetch(`http://ivan.firebreathlizard.space:8000/api/v1/project/${project_id}/vms`);
        if (!vmResponse.ok) {
          throw new Error('Ошибка при получении виртуальных машин');
        }
        const vmData = await vmResponse.json();
        
        // Проверяем, есть ли доступные виртуальные машины
        if (!vmData.vminfo || vmData.vminfo.length === 0) {
          throw new Error('Нет доступных виртуальных машин');
        }
        const vmId = vmData.vminfo[0].vm_id;

        // 3. Отправляем vm_id и значение action на бэк
        const actionResponse = await fetch(`http://ivan.firebreathlizard.space:8000/api/v1/vm/${vmId}/action`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'start' }),
        });

        if (!actionResponse.ok) {
          throw new Error('Ошибка при отправке действия');
        }

        alert('Действие успешно выполнено!');
      } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <button 
      title="Запустить"
      onClick={handleClick} 
      className={`action-button ${isLoading ? 'loading' : ''}`}
      disabled={isLoading}
    >
      <img src={startImage} alt="Start" />
    </button>
  );
};

export default StartButton;