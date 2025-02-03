import React, { useRef, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from '../Item';

const Board2 = ({ items, setItems, isDragging, snapToGrid, minX, maxX, minY, maxY, lastActiveItem, setLastActiveItem,boardOccupiedSpace, boardRef }) => {
  const [offsetY, setOffsetY] = useState(0);
  const itemWidth = 100;
  const itemHeight = 100;

  const handleItemDragStart = (item, event) => {
    const { clientX, clientY } = event;
  
    const boardElement = boardRef.current;
    const itemElement = document.getElementById(item.id);
  
    const isInsideBoard = boardElement && boardElement.contains(itemElement);
  
    const updatedItems = items.map((i) =>
      i.id === item.id
        ? {
            ...i,
            x: isInsideBoard ? clientX - 250 : clientX - 25,
            y: clientY - 25,
            isDragging: true,
          }
        : i
    );
  
    setItems(updatedItems);
    isDragging.current = true;
  };

  const handleItemDrag = (item, event) => {
    const { clientX, clientY } = event;

    // const isInsideGrid = item.x >= minX && item.x <= maxX && item.y >= minY && item.y <= maxY;

    // let snappedX, snappedY;

    // if (isInsideGrid) {
    //   ({ snappedX, snappedY } = snapToGrid(clientX - 25, clientY - 25));
    // } else {
    //   snappedX = clientX;
    //   snappedY = clientY;
    // }

    const updatedItems = items.map((i) =>
      
      i.id === item.id
        ? {
            ...i,
            x: clientX,
            y: clientY,
            isDragging: false,
          }
        : i
    );
    setItems(updatedItems);
  };

  const isItemInsideBoard = (x, y) => {
    return (
      x >= boardOccupiedSpace.xStart &&
      x <= boardOccupiedSpace.xEnd &&
      y >= boardOccupiedSpace.yStart &&
      y <= boardOccupiedSpace.yEnd
    );
  };
  const moveItemToBoard = (item) => {
    const boardElement = boardRef.current;
    const itemElement = document.getElementById(item.id);

    if (boardElement && itemElement) {
      boardElement.appendChild(itemElement);
      console.log(`Item ${item.id} moved to Board`);
    } else {
      console.error(`Failed to move item: ${item.id}. Board or Item not found.`);
    }
  };
  
  const handleItemDragEnd = (item) => {
    const isInsideGrid = isItemInsideBoard(item.x, item.y);
    
    console.log(`Is item inside board: ${isInsideGrid}`);
  
    const boardElement = boardRef.current; 
    const itemElement = document.getElementById(item.id); 
  
    const isInsideBoard = boardElement && boardElement.contains(itemElement);
  
    if (isInsideGrid) {
      moveItemToBoard(item);
    }
  
    const updatedItems = items.map((i) =>
      i.id === item.id
        ? {
            ...i,
            x: isInsideBoard ? item.x : item.x - 250, 
            y: item.y,
            isDragging: false,
          }
        : i
    );
  
    if (!isInsideBoard) {
      const updatedItems = items.map((i) =>
        i.id === item.id
          ? {
              ...i,
              x: item.x,
              y: item.y,
              isDragging: false,
            }
          : i
      );
      setItems(updatedItems);
    } else {
      setItems(updatedItems);
    }
  
    isDragging.current = false;
  
    setLastActiveItem({ x: item.x, y: item.y });
  };

  const handleItemDoubleClick = (itemId) => {
    setItems(items.map((item) => (item.id === itemId ? { ...item, expanded: !item.expanded } : item)));
  };

  return (
    <Droppable droppableId="board2">
      {(provided) => (
        <div
          ref={boardRef}
          {...provided.droppableProps}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '700px', 
            minWidth: '200px', 
            border: '1px solid black',
            // zIndex: '0',
            overflow: 'scroll',
            // position: 'relative',
          }}
        >
          {items.map((item, index) => (
            <Item
              key={item.id}
              item={item}
              index={index}
              handleItemDragStart={handleItemDragStart}
              handleItemDrag={handleItemDrag}
              handleItemDragEnd={handleItemDragEnd}
              handleItemDoubleClick={handleItemDoubleClick}
            />
          ))}
          {provided.placeholder}
          {/* Отображаем координаты последнего активного элемента */}
          {/* <div>
            <p>Последний активный элемент: X: {lastActiveItem.x}, Y: {lastActiveItem.y}</p>
          </div> */}
        </div>
      )}
    </Droppable>
  );
};

export default Board2;
