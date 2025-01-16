import React, { useRef, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from '../Item';

const Board2 = ({ items, setItems, isDragging, snapToGrid, minX, maxX, minY, maxY }) => {
  const boardRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

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

    const isInsideGrid = item.x >= minX && item.x <= maxX && item.y >= minY && item.y <= maxY;

    let snappedX, snappedY;

    if (isInsideGrid) {
      ({ snappedX, snappedY } = snapToGrid(clientX - 25, clientY - 25));
    } else {
      snappedX = clientX - 25;
      snappedY = clientY - 25;
    }

    const updatedItems = items.map((i) =>
      i.id === item.id
        ? {
            ...i,
            x: snappedX,
            y: snappedY,
            isDragging: true,
          }
        : i
    );
    setItems(updatedItems);

  };

  const handleItemDragEnd = (item) => {
    const isInsideGrid = item.x >= minX && item.x <= maxX && item.y >= minY && item.y <= maxY;

    let snappedX, snappedY;

    if (isInsideGrid) {
      ({ snappedX, snappedY } = snapToGrid(item.x, item.y));
    } else {
      snappedX = item.x;
      snappedY = item.y;
    }

    const updatedItems = items.map((i) =>
      i.id === item.id
        ? { ...i, x: snappedX, y: snappedY, isDragging: false }
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
            height: '700px', 
            minWidth: '200px', 
            border: '1px solid black',
            position: 'absolute',
            zIndex: '1',
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

export default Board2;