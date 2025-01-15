import React, { useState, useRef, useEffect } from 'react';
import '../../styles/menu_style.css'; 
import { DragDropContext } from 'react-beautiful-dnd';
import { useMenuItems } from '../../hooks/Menu/MenuContext'; // Импортируйте ваш контекст
import Board2 from './Board2';

const Menu = () => {
  const items = useMenuItems(); // Получите itemes из контекста
  const [localItems, setLocalItems] = useState(items); // Локальное состояние для управления перетаскиванием

  const isDragging = useRef(false);  
  const gridWidth = 200; 
  const gridHeight = 50; 
  const minX = 0; 
  const maxX = 190; 
  const minY = 0; 
  const maxY = 650; 

  // Обновляем локальное состояние при изменении items из контекста
  useEffect(() => {
    setLocalItems(items);
  }, [items]); // Зависимость от items

  const snapToGrid = (x, y) => {
    const snappedX = Math.max(minX, Math.min(maxX, Math.round(x / gridWidth) * gridWidth));
    const snappedY = Math.max(minY, Math.min(maxY, Math.round(y / gridHeight) * gridHeight));
    return { snappedX, snappedY };
  };

  const handleOnDragEnd = (result) => {    
    if (!result.destination) return;

    const itemsCopy = Array.from(localItems);            
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);

    setLocalItems(itemsCopy);  
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Board2 
        items={localItems} 
        setItems={setLocalItems} 
        isDragging={isDragging} 
        snapToGrid={snapToGrid} 
        minX={minX} 
        maxX={maxX} 
        minY={minY} 
        maxY={maxY} 
      />
    </DragDropContext>
  );
};

export default Menu;