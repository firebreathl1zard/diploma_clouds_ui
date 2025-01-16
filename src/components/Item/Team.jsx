import React, { useEffect, useState } from 'react';
import '../../styles/Item.css'

const Team = ({ project_id }) => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`http://10.3.21.200:12000/api/v1/project/${project_id}/team`); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeam(data.users);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchTeam();
  }, [project_id]);

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
      {team.length > 0 ? (
        team.map(user => (
          <div key={user.user_id}>
            <span><p ><abbr className='team' title={user.f_name}>{`${user.f_name} `}</abbr></p></span>
            {/* <span>{`${user.f_name} ${user.l_name}`}</span> */}
          </div>
        ))
      ) : (
        <p>Команда не найдена</p>
      )}
    </div>
  );
};

export default Team;