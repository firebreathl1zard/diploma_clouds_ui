import React, { useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';


const Board = ({ items, setItems, isDragging, listId }) => {

  const boardRef = useRef(null);

  const handleItemDragStart = (item, event) => {
    const { clientX, clientY } = event;
    const updatedItems = items.map((i) =>
      i.id === item.id
        ? {
            ...i,
            x: clientX - 25,
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
    const boardRect = boardRef.current.getBoundingClientRect();

    const newX = Math.max(0, Math.min(clientX - boardRect.left - 25, boardRect.width - 50));
    const newY = Math.max(0, Math.min(clientY - boardRect.top - 25, boardRect.height - 50));

    const updatedItems = items.map((i) =>
      i.id === item.id
        ? {
            ...i,
            x: newX,
            y: newY,
            isDragging: true,
          }
        : i
    );
    setItems(updatedItems);
  };

  const handleItemDragEnd = (item) => {
    const updatedItems = items.map((i) =>
      i.id === item.id
        ? { ...i, isDragging: false }
        : i
    );

  
    const maxZIndex = Math.max(...updatedItems.map(i => i.zIndex || 0));
    const updatedItemsWithZIndex = updatedItems.map((i) => ({
      ...i,
      zIndex: i.id === item.id ? maxZIndex + 1 : (i.zIndex || 0),
    }));

    setItems(updatedItemsWithZIndex);
    isDragging.current = false;
  };

  const handleItemDoubleClick = (itemId) => {
    setItems(items.map((item) => (item.id === itemId ? { ...item, expanded: !item.expanded } : item)));
  };

  return (
    <Droppable droppableId="board">
      {(provided) => (
        <div
          ref={boardRef}
          {...provided.droppableProps}
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '700px',
            width: '100%',
            border: '1px solid black',
            position: 'relative',
            // zIndex: '-1',
          }}
        >
        
          {items.map((item, index) => (
            <Item
              key={item.id}
              item={item}
              index={index}
              onDragStart={handleItemDragStart}
              onDrag={handleItemDrag}
              onDragEnd={handleItemDragEnd}
              onDoubleClick={handleItemDoubleClick}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Board;