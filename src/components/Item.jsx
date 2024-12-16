import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import '../styles/Item.css'; 

import Title from './Item/Title';
import Team from './Item/Team';
import Investment from './Item/Investment';
import Metrics from './Item/Metrics';
import MachineSelection from './Item/MachineSelection';
import PaymentButton from './Item/PaymentButton';
import Logs from './Item/Logs';

const Item = ({ item, index, handleItemDragStart, handleItemDragEnd, handleItemDoubleClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [metrics, setMetrics] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('');
  const [logs, setLogs] = useState([]);
  const [title, setTitle] = useState('[Enter Title Here]');
  const [team, setTeam] = useState('[Enter Team Here]');

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
    event.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    handleItemDragEnd(item);
  };

  const handlePayment = () => {
    const newLog = {
      dateTime: new Date().toLocaleString(),
      status: 'Завершено',
      user: 'Пользователь 1', // Замените на фактического пользователя
      description: `Инвестировано ${investmentAmount} в ${selectedMachine}`,
    };
    setLogs([...logs, newLog]);
    setInvestmentAmount('');
    setSelectedMachine('');
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
          className={`item ${isDragging ? 'dragging' : ''} ${isExpanded ? 'expanded' : 'collapsed'}`}
          style={{
            left: item.x,
            top: item.y,
          }}
          onMouseUp={handleMouseUp}
        >
          <div
            onMouseDown={handleMouseDown}
            className="item-header"
            onDoubleClick={handleExpand}
          >
            {item.content}
          </div>
          {isExpanded && (
            <div className="item-content">
              <div className="item-content-header">
                <Title title={title} />
                <Metrics metrics={metrics} />
                <div style={{ minWidth: '80px' }}>
                  <Team team={team} /> 
                </div>
              </div>
              <div className="item-content-body">
                <MachineSelection selectedMachine={selectedMachine} setSelectedMachine={setSelectedMachine} />
                <Investment investmentAmount={investmentAmount} setInvestmentAmount={setInvestmentAmount} />
              </div>
              <Logs logs={logs} />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Item;