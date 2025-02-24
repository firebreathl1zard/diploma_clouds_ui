import React, { useRef, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from '../Item';

const Board2 = ({ items, setItems, isDragging, snapToGrid, minX, maxX, minY, maxY, lastActiveItem, setLastActiveItem, boardOccupiedSpace, boardRef,handleDuplicateItem, onItemDragEnd, draggedItemId, setDraggedItemId }) => {
  const [offsetY, setOffsetY] = useState(0);
  const itemWidth = 100;
  const itemHeight = 100;

  const handleItemDragStart = (item, event) => {
    setDraggedItemId(item.id);
    // console.log('dragging');
    const { clientX, clientY } = event;
  
    const boardElement = boardRef.current;
    const itemElement = document.getElementById(item.id);
  
    const isInsideBoard = boardElement && boardElement.contains(itemElement);
  
    const updatedItems = items.map((i) =>
      i.id === item.id
        ? {
            ...i,
            x: isInsideBoard ? clientX - 300 : clientX - 25,
            y: isInsideBoard ? clientY - 65 : clientY - 25,
            isDragging: true,
          }
        : i
    );
  
    setItems(updatedItems);
    isDragging.current = true;
  };
  // console.log('123')
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
    // console.log(setDraggedItemId)
    const isInsideGrid = isItemInsideBoard(item.x, item.y);
    const boardElement = boardRef.current; 
    const itemElement = document.getElementById(item.id); 
    const isInsideBoard = boardElement && boardElement.contains(itemElement);

    if (!isInsideGrid) {
        const duplicateId = `${item.id}с`;
        const duplicateItem = items.find(i => i.id === duplicateId);

        if (duplicateItem) {

            const updatedItems = items.map((i) =>
                i.id === item.id
                    ? { ...i, x: duplicateItem.x, y: duplicateItem.y }
                    : i
            );

            const finalItems = updatedItems.filter(i => i.id !== duplicateId);

            setItems(finalItems);

            localStorage.setItem('items', JSON.stringify(finalItems));
        } else {
            console.warn(`Duplicate item with id ${duplicateId} not found.`);
        }
    }
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
            minWidth: '250px', 
            // border: '1px solid black',
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
                handleDuplicateItem={handleDuplicateItem}
                draggedItemId={draggedItemId}
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