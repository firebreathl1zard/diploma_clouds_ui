import React, { useEffect } from 'react';

const Investment = ({ investmentAmount }) => {
  useEffect(() => {
    const fetchInvestmentData = async () => {
      try {
        const response = await fetch(`https://api.example.com/investment?amount=${investmentAmount}`);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    if (investmentAmount) {
      fetchInvestmentData();
    }
  }, [investmentAmount]);

  return (
    <div>
      <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Финансы:</div>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          minHeight: '30px',
          backgroundColor: '#f9f9f9',
          width: '100%',
          fontWeight: 'bold',
        }}
      >
        
      </div>
    </div>
  );
};

export default Investment;