import React from 'react';

const Title = ({ title }) => {
  return (
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
      <p>{title}</p>
    </div>
  );
};

export default Title;