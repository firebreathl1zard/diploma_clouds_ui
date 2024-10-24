import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min";
import './Components.css';


          
function Glavnai() {
        
    const [boards,setBoard] = useState( [    //board и их содержание
            {id: '1', title:'Проекты', items:[{id: 'item-1', title: 'Элемент 1', description: 'Краткое описание 1'},
                { id: 'item-2', title: 'Элемент 2', description: 'Краткое описание 2'},
                { id: 'item-3', title: 'Элемент 3', description: 'Краткое описание 3'}
            ]},
            {id: '2', title: 'Доска', items:[{id: 'item-4', title: 'Элемент 4', description: 'Краткое описание 4'}]}   
         ])
    const [currentBoard,setCurrentboard] = useState(null)
    const [currentItem,setCurrentitem] = useState(null)


    function dragOverHendler (e)  {             
        e.preventDefault()
        if (e.target.className == 'item') {
            e.target.style.boxShadow = '0 2px 3px grey'
        }
    }

    function dragLeaveHendler (e)  {
        e.target.style.boxShadow = 'none'
    }
    function dragStartHendler (e,board,item)  {
        setCurrentboard(board)
        setCurrentitem(item)
    }
    function dragEndHendler (e)  {
        e.target.style.boxShadow = 'none'
    }
    function dropHendler (e,board,item)  {        //Перетаскивает элемент из одной доски в другую, вставляя его в определенное место в целевой доске
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1,0, currentItem)
        setBoard(boards.map(b => {
            if(b.id === board.id){
                return board
            }
            if(b.id === currentBoard.id){
                return currentBoard
            }
            return b
        }))
        e.target.style.boxShadow = 'none'
    }
    function dropCardHendler(e,board) {           //Перемещает элемент на другую доску, добавляя его в конец списка элементов этой доски
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        setBoard(boards.map(b => {
            if(b.id === board.id){
                return board
            }
            if(b.id === currentBoard.id){
                return currentBoard
            }
            return b
        }))
        e.target.style.boxShadow = 'none'
    }
                return (
                <div className="app">
                    {boards.map(board=>
                    <div className="board1 "
                    onDragOver = {(e) => dragOverHendler(e)}     //Этот обработчик вызывается, когда элемент перетаскивается над доской
                    onDrop = {(e) => dropCardHendler(e,board)}      //Этот обработчик вызывается, когда элемент сбрасывается на доску
                    >
                        <div className="board-title ">{board.title}</div>
                        {board.items.map(item =>
                            <div 
                            onDragOver = {(e) => dragOverHendler(e)} 
                            onDragLeave = {(e) => dragLeaveHendler(e)} 
                            onDragStart = {(e) => dragStartHendler(e,board,item)} 
                            onDragEnd = {(e) => dragEndHendler(e)} 
                            onDrop = {(e) => dropHendler(e,board,item)} 
                            className="todo item"
                            draggable={true}
                            
                            >
                                {item.title}
                                <p>{item.description}</p> 
                            </div>
                        )}
                    </div>
                    )} 
            </div>
        );
      }
      
      

export  {Glavnai};