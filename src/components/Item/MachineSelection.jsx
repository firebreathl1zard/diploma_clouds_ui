import React, { useEffect, useState } from 'react';

const MachineSelection = ({ selectedMachine, setSelectedMachine }) => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await fetch('URL_TO_FETCH_MACHINES'); 
        const data = await response.json();
        setMachines(data);
      } catch (error) {
        console.error('Ошибка при загрузке машин:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  return (
    <div style={{
      width: '250px',
      height: '200px',
      border: '1px solid black', // Add a border
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Center the button horizontally
      position: 'relative' // Position relative for absolute positioning if needed
    }}>
      <button
        onClick={() => console.log('Добавить новую машину')}
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          fontSize: '20px',
          position: 'absolute', // Position absolute to center it
        }}
      >
        +
      </button>
    </div>
  );
};

export default MachineSelection;