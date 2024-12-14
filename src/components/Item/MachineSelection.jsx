import React from 'react';

const MachineSelection = ({ selectedMachine, setSelectedMachine, machines }) => (
  <div>
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
  </div>
);

export default MachineSelection;