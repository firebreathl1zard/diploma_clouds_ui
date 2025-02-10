import React, { useEffect, useState } from 'react';

const Investment = ({ investmentAmount, project_id }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [finances, setFinances] = useState(null); 

  useEffect(() => {
    const fetchInvestmentData = async () => {
      try {
        const response = await fetch(`${apiUrl}/v1/finances/current?project=${project_id}`,{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        // console.log('Полученные данные:', data);
        setFinances(data.finances);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    
      fetchInvestmentData();
  }, [investmentAmount, project_id]); 

  return (
    <div>
      <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Финансы:</div>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          minHeight: '25px',
          backgroundColor: '#f9f9f9',
          width: '20%',
          fontWeight: 'bold',
        }}
      >
        {/* {console.log(finances)} */}
        {finances !== null ? finances : 'Загрузка...'}
      </div>
    </div>
  );
};

export default Investment;