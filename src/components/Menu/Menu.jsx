import React, { useState, useRef } from 'react';
import '../../styles/menu_style.css'; 
import { DragDropContext } from 'react-beautiful-dnd';
import Item from '../Item';
import Board from './Board2';


const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [items, setItems] = useState([
    { id: '1', content: 'Объект 1', x: 10, y: 10, isDragging: false, expanded: false },
    { id: '2', content: 'Объект 2', x: 10, y: 60, isDragging: false, expanded: false },
    { id: '3', content: 'Объект 3', x: 10, y: 110, isDragging: false, expanded: false },
    { id: '4', content: 'Объект 4', x: 10, y: 160, isDragging: false, expanded: false },
  ]);

  const isDragging = useRef(false);  // Ссылка на DOM-элемент, чтобы отслеживать, перетаскивается ли элемент

  const handleOnDragEnd = (result) => {    // Обработчик события, которое вызывается при завершении перетаскивания
    if (!result.destination) return;

    const itemsCopy = Array.from(items);            //Удаляет исходное положение и заменяет на новое
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);

    setItems(itemsCopy);   //Обновляет состояние
  };
  

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
    <Board items={items} setItems={setItems} isDragging={isDragging}>
    <div className="app">
      <button className="burger" onClick={toggleMenu}>
        {isOpen ? 'Close' : 'Open'} Menu
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li><Item/></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </div>
    </Board>
    </DragDropContext>

  );

};

export default Menu;