import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import '../styles/Item.css'; 

import Team from './Item/Team';
import Logs from './Item/Logs';
import VirtualMachines from './Item/VirtualMachines';

const Item = ({ item, index, handleItemDragStart, handleItemDragEnd, handleItemDoubleClick, isChild, handleDuplicateItem, draggedItemId}) => {
  const [isExpanded, setIsExpanded] = useState(item.expanded);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('');
  const [logs, setLogs] = useState([]);
  const [team, setTeam] = useState('[Enter Team Here]');
  const [vmStatuses, setVmStatuses] = useState([]);
  const [hasVmInfo, setHasVmInfo] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleExpand = () => {
    if (isChild) {
      // console.log(321)
      setIsExpanded(prev => !prev);
      handleItemDoubleClick(item.id);
    }
  };

  useEffect(() => {
    // console.log('Rendering Item component with id:', item.id, 'isExpanded:', isExpanded);
  }, [isExpanded, item.id]);

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

  useEffect(() => {
    if (!item.id.endsWith('с')) {
      const fetchVmData = async () => {
        try {
          const response = await fetch(`${apiUrl}/v1/project/${item.id}/vms`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          const data = await response.json();
          
          if (data.vminfo && data.vminfo.length > 0) {
            const statuses = data.vminfo.map(vm => ({
              purpose: vm.vm_purpose,
              status: vm.status
            }));
            setVmStatuses(statuses);
          } else {
            setVmStatuses([]);
          }
        } catch (error) {
          console.error('Error fetching VM data:', error);
        }
      };

      fetchVmData();

      const intervalId = setInterval(fetchVmData, 10000);
      return () => clearInterval(intervalId);
    }
  }, [item.id, apiUrl]);

  const getStatusColor = (status) => {
    if (status === undefined) {
      return 'grey';
    }

    switch (status) {
      case 'running':
        return 'green';
      case 'stopped':
        return '#7C7A8C';
      case 'pending':
        return 'grey';
      default:
        return 'yellow';
    }
  };

  const handleMouseDown = (event) => {
    const isCopy = item.id.endsWith('с');
    if (!isChild) {
      const newItem = {
        ...item,
        id: `${item.id}с`,
        
      };

      if (isCopy) {
        event.preventDefault();
        return;
      }
      
      handleDuplicateItem(newItem);
    }
  
    setIsDragging(true);
    const { clientX, clientY } = event;
    const rect = event.target.getBoundingClientRect();
    setOffsetX(clientX - rect.left);
    setOffsetY(clientY - rect.top);
    event.preventDefault();
  };

  const handleMouseUp = (event) => {
    setIsDragging(false);
    handleItemDragEnd(item);
    if (isMouseDown) {
      handleItemDragEnd(item);
    }
    setIsMouseDown(false);
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
          {...provided.dragHandleProps}
          className={`item ${isDragging ? 'dragging' : ''} ${isExpanded ? 'expanded' : 'collapsed'} ${item.id.endsWith('с') ? 'copy collapsed' : ''}`}
          style={{
            left: item.x,
            top: item.y,
            position: 'absolute',
            zIndex: isDragging || item.id === draggedItemId ? '1000' : '1',
            pointerEvents: item.id.endsWith('с') ? 'none' : 'auto', 
          }}
          onMouseUp={handleMouseUp}
        >
          <div
            onMouseDown={handleMouseDown}
            className="item-header"
            onDoubleClick={handleExpand}
          >
            <div className="item-content-header">
              <abbr className='item-title' title={item.content}>{item.content}</abbr>
              {/* {isExpanded && (
                <MachineSelection projectId={item.id} />
              )} */}
              {!isExpanded && (
                <div className="status-indicators-container">
                  {vmStatuses.map((vm, index) => (
                    <span
                      key={index}
                      className="status-indicator"
                      style={{ backgroundColor: getStatusColor(vm.status) }}
                      title={`${vm.purpose}:${vm.status}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {isExpanded && (
            <div className="item-content">
              <div className="item-content-header">
                <div style={{ minWidth: '80px', }}>
                  <Team project_id={item.id} />
                  {/* <Investment investmentAmount={investmentAmount} setInvestmentAmount={setInvestmentAmount} project_id={item.id} /> */}
                </div>
              </div>
              <div className="item-content-body">
                <div className="machine-selection-container">
                  <VirtualMachines projectId={item.id} /> 
                </div>
              </div>
              {/* <Logs logs={logs} /> */}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Item;