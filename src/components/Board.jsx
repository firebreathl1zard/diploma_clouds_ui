import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';

const Board = ({ items, setItems, isDragging, boardOccupiedSpace, setBoardOccupiedSpace, boardRef}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });

  const updatePositionAndSize = () => {
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top });
      setSize({ width: rect.width, height: rect.height });
    }
  };


  const calculateBoardOccupiedSpace = () => {
    const xStart = position.x;
    const xEnd = position.x + size.width;
    const yStart = position.y;
    const yEnd = position.y + size.height;

    setBoardOccupiedSpace({ xStart, xEnd, yStart, yEnd });
  };

  useLayoutEffect(() => {
    updatePositionAndSize(); 
    calculateBoardOccupiedSpace(); 
    window.addEventListener('resize', updatePositionAndSize); 

    return () => {
      window.removeEventListener('resize', updatePositionAndSize); 
    };
  }, [items]);

  useEffect(() => {
    calculateBoardOccupiedSpace();
  }, [items, position, size]);

  const handleItemDragStart = (item, event) => {
    const { clientX, clientY } = event;
    const updatedItems = items.map((i) =>
      i.id === item.id
        ? {
            ...i,
            x: clientX - 250,
            y: clientY - 30,
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
            x: clientX - 25,
            y: clientY - 25,
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
            // zIndex: '1',
            position: 'relative',
          }}
        >
          {/* <div>
            <p>Board Position: X: {position.x}, Y: {position.y}</p>
            <p>Board Size: Width: {size.width}, Height: {size.height}</p>
            <p>Board Occupied Space: X: {boardOccupiedSpace.xStart} to {boardOccupiedSpace.xEnd}, Y: {boardOccupiedSpace.yStart} to {boardOccupiedSpace.yEnd}</p>
          </div> */}
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