import React, { useEffect, useState } from 'react';
import '../../styles/Item.css'

const Team = ({ project_id }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [team, setTeam] = useState([]); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${apiUrl}/v1/project/${project_id}/team`,{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include',
        }); 

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeam(data.users || []);
      } catch (error) {
        setError('Ошибка при получении данных'); 
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchTeam();
  }, [project_id]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '3px',
        backgroundColor: '#292739',
        fontSize: '11px'
      }}
    >
      {error ? ( 
        <p>{error}</p>
      ) : team.length > 0 ? (
        <>
          <span>Команда: </span>
          {team.map((user, index) => (
            <div key={user.user_id}>
              <span>
                <p>
                  <abbr className='team' title={user.login}>
                    {`${user.f_name} ${user.l_name}${index < team.length - 1 ? ', ' : ''}`}
                  </abbr>
                </p>
              </span>
            </div>
          ))}
        </>
      ) : (
        <p>Команда не найдена</p>
      )}
    </div>
  );
};

export default Team;