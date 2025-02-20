import React, { createContext, useContext, useState, useEffect } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [itemes, setItemes] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${apiUrl}/v1/projects`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      
      const formattedItems = data.projects.map((project, index) => ({
        id: project.project_id.toString(),
        content: project.title,
        x: 0,
        y: index * 50,
        isDragging: false,
        expanded: false,
        parentId: null,
      }));

      setItemes(formattedItems);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  useEffect(() => {

    fetchItems();
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