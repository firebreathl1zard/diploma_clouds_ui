import React, { useEffect, useState } from 'react';

const Metrics = () => {
  const [metrics, setMetrics] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('URL_ВАШЕГО_API'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMetrics(data.metrics); 
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchMetrics();
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
      {metrics}
    </div>
  );
};

export default Metrics;