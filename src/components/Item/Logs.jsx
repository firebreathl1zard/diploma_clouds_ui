import React from 'react';

const Logs = ({ logs }) => (
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
);

export default Logs;