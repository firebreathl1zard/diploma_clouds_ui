import React, { useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';

const Board = ({ items, setItems, isDragging }) => {     // Создаем ссылку на DOM-элемент доски
  const boardRef = useRef(null);

  const handleItemDragStart = (item, event) => {    // Обработчик события, которое вызывается при начале перетаскивания элемента
    const { clientX, clientY } = event;     // Получаем координаты курсора мыши при начале перетаскивания
    const updatedItems = items.map((i) =>   // Обновляем состояние `items`, чтобы узнать, что элемент перетаскивается
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
    isDragging.current = true; //  Устанавливаем флаг перетаскивания
  };

  const handleItemDrag = (item, event) => {
    const { clientX, clientY } = event;
    const boardRect = boardRef.current.getBoundingClientRect();  // Получаем прямоугольник, ограничивающий область доски

    const newX = Math.max(0, Math.min(clientX - boardRect.left - 25, boardRect.width - 50));   // Вычисляем новые координаты элемента, чтобы он оставался в пределах доски
    const newY = Math.max(0, Math.min(clientY - boardRect.top - 25, boardRect.height - 50));

    const updatedItems = items.map((i) =>     // Обновляем состояние `items`, чтобы обновить координаты перетаскиваемого элемента
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
    const updatedItems = items.map((i) =>     // Обновляем состояние `items`, чтобы указать, что элемент больше не перетаскивается
      i.id === item.id
        ? { ...i, isDragging: false }
        : i
    );
    setItems(updatedItems);
    isDragging.current = false;
  };

  const handleItemDoubleClick = (itemId) => {         // Сбрасываем флаг перетаскивания
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
          }}
        >
          {items.map((item, index) => (
            <Item      // Отрисовываем каждый элемент на доске
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