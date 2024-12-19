import React, { useEffect, useState } from 'react';

const Team = () => {
  const [team, setTeam] = useState('');

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(''); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeam(data.team); 
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchTeam();
  }, []);

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
      {team}
    </div>
  );
};

export default Team;