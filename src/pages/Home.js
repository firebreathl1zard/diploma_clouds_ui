import React, { useState, useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Board from '../components/Board';

const HomePages = () => {
  //Хранения элементов и их состояние
  const [items, setItems] = useState([
    { id: '1', content: 'Объект 1', x: 10, y: 10, isDragging: false, expanded: false, zIndex: 1 },
    { id: '2', content: 'Объект 2', x: 10, y: 60, isDragging: false, expanded: false, zIndex: 2 },
    { id: '3', content: 'Объект 3', x: 10, y: 110, isDragging: false, expanded: false, zIndex: 3 },
    { id: '4', content: 'Объект 4', x: 10, y: 160, isDragging: false, expanded: false, zIndex: 4 },
  ]);

  const isDragging = useRef(false);  // Ссылка на DOM-элемент, чтобы отслеживать, перетаскивается ли элемент

  const handleOnDragEnd = (result) => {    // Обработчик события, которое вызывается при завершении перетаскивания
    if (!result.destination) return;

    const itemsCopy = Array.from(items);            //Удаляет исходное положение и заменяет на новое
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);

    // Обновляем z-index для всех элементов
    itemsCopy.forEach((item, index) => {
      item.zIndex = index + 1;
    });

    setItems(itemsCopy);   //Обновляет состояние
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Board items={items} setItems={setItems} isDragging={isDragging} />
    </DragDropContext>
  );
};

export {HomePages};