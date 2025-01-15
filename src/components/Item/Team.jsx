import React, { useEffect, useState } from 'react';

const Team = ({ project_id }) => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {

        const response = await fetch(''); 

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeam(data.users); // Предполагаем, что данные о пользователях находятся в поле "users"
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchTeam();
  }, [project_id]); // Добавляем project_id в зависимости

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
            <span>{`${user.f_name} `}</span>
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