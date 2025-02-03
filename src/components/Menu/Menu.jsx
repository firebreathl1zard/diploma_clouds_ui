import React, { useState, useRef, useEffect } from 'react';
import '../../styles/menu_style.css'; 
import { DragDropContext } from 'react-beautiful-dnd';
import { useMenuItems } from '../../hooks/Menu/MenuContext'; 
import Board2 from './Board2';
import Board from '../Board';

const Menu = () => {
  const items = useMenuItems(); 
  const [localItems, setLocalItems] = useState(items); 
  const [itemes, setItemes] = useState([]);

  const isDragging = useRef(false);  
  const gridWidth = 200; 
  const gridHeight = 50; 
  const minX = 0; 
  const maxX = 190; 
  const minY = 0; 
  const maxY = 650; 

  const [lastActiveItem, setLastActiveItem] = useState({ x: 0, y: 0 });
  const [boardOccupiedSpace, setBoardOccupiedSpace] = useState({ xStart: 0, xEnd: 0, yStart: 0, yEnd: 0 });

  const boardRef = useRef(null);

  useEffect(() => {
    setLocalItems(items);
  }, [items]); 

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
        lastActiveItem={lastActiveItem}
        setLastActiveItem={setLastActiveItem}
        boardOccupiedSpace={boardOccupiedSpace}
        setBoardOccupiedSpace={setBoardOccupiedSpace}
        boardRef={boardRef}
      />
      <Board 
        items={itemes} 
        setItems={setItemes} 
        isDragging={isDragging}
        boardOccupiedSpace={boardOccupiedSpace}
        setBoardOccupiedSpace={setBoardOccupiedSpace}
        boardRef={boardRef}
      />
    </DragDropContext>
  );
};

export default Menu;