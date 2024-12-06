import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Name from './Item/Name'; 

const Item = ({ item, index, handleItemDragStart, handleItemDrag, handleItemDragEnd, handleItemDoubleClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false); 
  const [title, setTitle] = useState('kakashka'); 

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    handleItemDoubleClick(item.id);
  };

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await fetch(``);
        const data = await response.json();
        setTitle(data.title); 
      } catch (error) {
        console.error('Ошибка при получении названия:', error);
      }
    };

    fetchTitle(); 

    const handleMouseMove = (event) => {
      if (isDragging) {
        const { clientX, clientY } = event;
        handleItemDrag(item, { clientX, clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove); 

    return () => window.removeEventListener('mousemove', handleMouseMove);  
  }, [isDragging, item, handleItemDrag]);

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
            opacity: item.isDragging ? 0.5 : 1,
            width: isExpanded ? '200px' : '100px',
          }}
          onMouseDown={(event) => {
            setIsDragging(true);
            const { clientX, clientY } = event; 
            handleItemDragStart(item, { clientX, clientY }); 
          }}
          onMouseUp={() => {
            setIsDragging(false);
            handleItemDragEnd(item);
          }}
          onDoubleClick={handleExpand}
        >
          <Name title={title} /> 
          <div>
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