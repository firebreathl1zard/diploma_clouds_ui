import React from 'react';

const Team = ({ team }) => (
    <>
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
  </>
);

export default Team;