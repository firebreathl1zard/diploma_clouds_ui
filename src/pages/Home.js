import React, { useState, useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Board from '../components/Board';
import Menu from '../components/Menu/Menu';
import { MenuProvider } from '../hooks/Menu/MenuContext';

const HomePages = () => {
  
  const [items, setItems] = useState([]);

  const isDragging = useRef(false);  

  const handleOnDragEnd = (result) => {    
    if (!result.destination) return;

    const itemsCopy = Array.from(items);           
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);

    
    itemsCopy.forEach((item, index) => {
      item.zIndex = index + 1;
    });

    setItems(itemsCopy);   
  };



  const handleLogout = () => {
    console.log("User  logged out");
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
      <MenuProvider>
      <Menu />
      </MenuProvider>
      {/* <Board items={items} setItems={setItems} isDragging={isDragging} /> */}
      </div>
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>
        Выйти
      </button>
    </DragDropContext>
  );
};

export { HomePages };