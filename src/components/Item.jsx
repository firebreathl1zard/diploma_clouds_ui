import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Item = ({ item, index, handleItemDragStart, handleItemDragEnd, handleItemDoubleClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);


  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    handleItemDoubleClick(item.id);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        const { clientX, clientY } = event;
        handleItemDragStart(item, { clientX, clientY, offsetX, offsetY }); 
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDragging, item, handleItemDragStart, offsetX, offsetY]);


  const handleMouseDown = (event) => {
    setIsDragging(true);
    const { clientX, clientY } = event;
    const rect = event.target.getBoundingClientRect();
    setOffsetX(clientX - rect.left);
    setOffsetY(clientY - rect.top);
    handleItemDragStart(item, { clientX, clientY, offsetX, offsetY }); 
    event.preventDefault(); 
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    handleItemDragEnd(item);
  };

  return (
    <Draggable
      key={item.id}
      draggableId={item.id.toString()}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            position: 'absolute',
            left: item.x,
            top: item.y,
            backgroundColor: 'lightblue',
            padding: '10px',
            cursor: 'move',
            opacity: isDragging ? 0.5 : 1,
            width: isExpanded ? '200px' : '100px',
            userSelect: 'none', 
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onDoubleClick={handleExpand}
        >
          <div style={{userSelect: 'none'}}> 
            {item.content}
          </div>
          {isExpanded && (
            <div style={{ paddingTop: '5px' }}>
              <p>Дополнительная информация: {item.id}</p>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Item;