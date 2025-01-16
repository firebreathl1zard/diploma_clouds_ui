import React, { useState, useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Board from '../components/Board';
import Menu from '../components/Menu/Menu';
import { MenuProvider } from '../hooks/Menu/MenuContext';

const HomePages = () => {
  // Хранение элементов и их состояние
  const [items, setItems] = useState([]);

  const isDragging = useRef(false);  // Ссылка на DOM-элемент, чтобы отслеживать, перетаскивается ли элемент

  const handleOnDragEnd = (result) => {    // Обработчик события, которое вызывается при завершении перетаскивания
    if (!result.destination) return;

    const itemsCopy = Array.from(items);            // Удаляет исходное положение и заменяет на новое
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);

    // Обновляем z-index для всех элементов
    itemsCopy.forEach((item, index) => {
      item.zIndex = index + 1;
    });

    setItems(itemsCopy);   // Обновляет состояние
  };

  const handleLogout = () => {
    // Здесь вы можете добавить логику выхода, например, очистка токена и редирект на страницу входа
    console.log("User  logged out");
    localStorage.removeItem('token');
    window.location.href = '/'; // или используйте react-router для навигации
  };

  const handleLogout = () => {
    // Здесь вы можете добавить логику выхода, например, очистка токена и редирект на страницу входа
    console.log("User  logged out");
    localStorage.removeItem('token');
    window.location.href = '/'; // или используйте react-router для навигации
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>

      <Menu />
      <Board items={items} setItems={setItems} isDragging={isDragging} />
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>
        Выйти
      </button>

      </div>
    </DragDropContext>
  );
};

export { HomePages };