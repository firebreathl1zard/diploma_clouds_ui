import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';

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

  const machines = ['Машина A', 'Машина B', 'Машина C'];

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    handleItemDoubleClick(item.id);
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
          style={{
            position: 'absolute',
            left: item.x,
            top: item.y,
            backgroundColor: 'lightblue',
            padding: '10px',
            cursor: isExpanded ? 'default' : 'move',
            opacity: isDragging ? 0.5 : 1,
            width: isExpanded ? '400px' : '100px',
            userSelect: 'none',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
          onMouseUp={handleMouseUp}
        >
          {/* Верхняя часть для перетаскивания */}
          <div
            onMouseDown={handleMouseDown}
            style={{
              cursor: 'move',
              padding: '5px',
              fontWeight: 'bold',
            }}
            onDoubleClick={handleExpand}
          >
            {item.content}
          </div>
          {isExpanded && (
            <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Контейнер для полей Title, Team и Инвестиции */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ flex: 1, marginRight: '5px' }}>
                  <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Title:</div>
                  <div
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '8px',
                      minHeight: '30px',
                      backgroundColor: '#fff',
                      width: '100%',
                      wordWrap: 'break-word',
                    }}
                  >
                    {title}
                  </div>
                </div>
                <div style={{ flex: 1, marginRight: '5px' }}>
                  <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Team:</div>
                  <div
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '8px',
                      minHeight: '30px',
                      backgroundColor: '#fff',
                      width: '100%',
                      wordWrap: 'break-word',
                    }}
                  >
                    {team}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Инвестиции:</div>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder="Сумма"
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '8px',
                      minHeight: '30px',
                      backgroundColor: '#fff',
                      width: '100%',
                    }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Metrics:</div>
                <div
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px',
                    minHeight: '30px',
                    backgroundColor: '#fff',
                    width: '100%',
                    wordWrap: 'break-word',
                  }}
                >
                  {metrics}
                </div>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <select
                  value={selectedMachine}
                  onChange={(e) => setSelectedMachine(e.target.value)}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px',
                    marginTop: '5px',
                    width: '100%',
                  }}
                >
                  <option value="">Выберите машину</option>
                  {machines.map((machine) => (
                    <option key={machine} value={machine}>{machine}</option>
                  ))}
                </select>
                <button
                  onClick={handlePayment}
                  style={{
                    marginTop: '10px',
                    padding: '8px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Оплатить
                </button>
              </div>
              <div style={{ marginBottom: '10px', maxHeight: '150px', overflowY: 'auto' }}>
                <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Логи:</div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>Дата/Время</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>Статус</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>Пользователь</th>
                      <th style={{ border: '1px solid #ccc', padding: '8px' }}>Описание</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log, index) => (
                      <tr key={index}>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{log.dateTime}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{log.status}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{log.user}</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{log.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Item;