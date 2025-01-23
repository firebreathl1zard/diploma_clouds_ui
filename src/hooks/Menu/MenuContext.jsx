import React, { createContext, useContext, useState, useEffect } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [itemes, setItemes] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://10.3.21.200:8000/api/v1/projects');
      const data = await response.json();
      
      const formattedItems = data.projects.map((project, index) => ({
        id: project.project_id.toString(),
        content: project.title,
        x: 0,
        y: index * 50,
        isDragging: false,
        expanded: false,
      }));

      setItemes(formattedItems);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  useEffect(() => {
    // Первоначальный вызов для получения данных
    fetchItems();

    // Устанавливаем интервал для периодического обновления данных
    const intervalId = setInterval(fetchItems, 60000); // 60000 мс = 1 минута

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []); // Пустой массив зависимостей, чтобы выполнить эффект только один раз при монтировании

  return (
    <MenuContext.Provider value={itemes}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuItems = () => {
  return useContext(MenuContext);
};