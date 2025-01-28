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

    fetchItems();

    
    const intervalId = setInterval(fetchItems, 60000); 

    
    return () => clearInterval(intervalId);
  }, []); 
  return (
    <MenuContext.Provider value={itemes}>
      {children}
    </MenuContext.Provider>
  );
};
// useSelector(state => state.menuItems.items)
export const useMenuItems = () => {
  return useContext(MenuContext);
};