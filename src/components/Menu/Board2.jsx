import React, { useRef, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from '../Item';

const Board2 = ({ items, setItems, isDragging, snapToGrid, minX, maxX, minY, maxY, lastActiveItem, setLastActiveItem, boardOccupiedSpace, boardRef }) => {
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
            x: isInsideBoard ? clientX - 25 : clientX - 25,
            y: isInsideBoard ? clientY - 25 : clientY - 25,
            isDragging: true,
          }
        : i
    );
  
    setItems(updatedItems);
    isDragging.current = true;
  };

  const handleItemDrag = (item, event) => {
    const { clientX, clientY } = event;

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
      const rect = itemElement.getBoundingClientRect();
      const boardRect = boardElement.getBoundingClientRect();
  
      const newX = rect.left - boardRect.left;
      const newY = rect.top - boardRect.top;
  
      itemElement.style.position = 'absolute';
      itemElement.style.left = `${newX}px`;
      itemElement.style.top = `${newY}px`;
  
      boardElement.appendChild(itemElement);
    } else {
      console.error(`Failed to move item: ${item.id}. Board or Item not found.`);
    }
  };
  
  const handleItemDragEnd = (item) => {
    const isInsideGrid = isItemInsideBoard(item.x, item.y);
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
            // x: isInsideBoard ? item.x : item.x - 250,
            x: item.x,
            y: item.y,
            isDragging: false,
          }
        : i
    );
  
    setItems(updatedItems);
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
            overflow: 'scroll',
          }}
        >
          {items.map((item, index) => {
            const isChild = isItemInsideBoard(item.x, item.y);
            return (
              <Item
                key={item.id}
                item={item}
                index={index}
                handleItemDragStart={handleItemDragStart}
                handleItemDrag={handleItemDrag}
                handleItemDragEnd={handleItemDragEnd}
                handleItemDoubleClick={handleItemDoubleClick}
                isChild={isChild}
              />
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Board2;