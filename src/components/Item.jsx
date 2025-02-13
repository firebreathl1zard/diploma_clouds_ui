import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import '../styles/Item.css'; 

import Title from './Item/Title';
import Team from './Item/Team';
import Investment from './Item/Investment';
// import Metrics from './Item/Metrics';
import MachineSelection from './Item/MachineSelection/MachineSelection';
import PaymentButton from './Item/PaymentButton';
import Logs from './Item/Logs';
import VirtualMachines from './Item/VirtualMachines';

const Item = ({ item, index, handleItemDragStart, handleItemDragEnd, handleItemDoubleClick, isChild }) => {
  const [isExpanded, setIsExpanded] = useState(item.expanded);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [metrics, setMetrics] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('');
  const [logs, setLogs] = useState([]);
  const [team, setTeam] = useState('[Enter Team Here]');

  const handleExpand = () => {
    if (isChild) {
      setIsExpanded(!isExpanded);  
      handleItemDoubleClick(item.id);
      }
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
      user: 'Пользователь 1', 
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
          id={item.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`item ${isDragging ? 'dragging' : ''} ${isExpanded ? 'expanded' : 'collapsed'}`}
          style={{
            left: item.x,
            top: item.y,
            position: 'absolute',
            zIndex: '999',
          }}
          onMouseUp={handleMouseUp}
        >
          <div
            onMouseDown={handleMouseDown}
            className="item-header"
            onDoubleClick={handleExpand}
          >
            <div className="item-content-header">
              <p><abbr className='item-title' title={item.content}>{item.content}</abbr></p>
            </div>
          </div>
          {isExpanded && (
            <div className="item-content">
              <div className="item-content-header">
                <div style={{ minWidth: '80px', marginLeft: '280px', }}>
                  <Team project_id={item.id} />
                </div>
              </div>
              <div className="item-content-body">
                <div className="machine-selection-container">
                  <VirtualMachines projectId={item.id} /> 
                </div>
                {/* <Metrics projectId={item.id}/> */}
                <Investment investmentAmount={investmentAmount} setInvestmentAmount={setInvestmentAmount} project_id={item.id} />
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