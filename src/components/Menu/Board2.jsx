import React, { useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from '../Item';

const Board = ({ items, setItems, isDragging }) => {
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
            x: newX ,
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
    setItems(updatedItems);
    isDragging.current = false;
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
            minHeight: '700px',
            width: '200px',
            border: '1px solid black',
            position: 'absolute',
            // zIndex: '1',
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
        </div>
      )}
    </Droppable>
  );
};

export default Board;