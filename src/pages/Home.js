import React, { useState, useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Board from '../components/Board';
import Menu from '../components/Menu/Menu';
import { MenuProvider } from '../hooks/Menu/MenuContext';

const HomePages = () => {
  //Хранения элементов и их состояние
  const [items, setItems] = useState([
    
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
      <div>
      <MenuProvider>
      <Menu/>
      </MenuProvider>
      <Board items={items} setItems={setItems} isDragging={isDragging} />
      </div>
    </DragDropContext>
  );
};

export {HomePages};