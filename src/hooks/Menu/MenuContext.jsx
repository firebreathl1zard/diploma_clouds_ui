import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setItems } from '../../components/itemsSlice'; 

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const [itemes, setItemes] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${apiUrl}/v1/projects`, {
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
        x: 20,
        y: 60 + index * 60,
        isDragging: false,
        expanded: false,
        parentId: null,
        className: 'collapsed',
      }));

      setItemes(formattedItems);
      dispatch(setItems(formattedItems));
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

export const useMenuItems = () => {
  return useContext(MenuContext);
};