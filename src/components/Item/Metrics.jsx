import React from 'react';

const Metrics = ({ metrics }) => (
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
);

export default Metrics;