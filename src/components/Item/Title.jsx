import React from 'react';

const Title = ({ title }) => (
  <>
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
  </>
);

export default Title;