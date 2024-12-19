import React, { useEffect, useState } from 'react';

const Title = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await fetch(''); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTitle(data.title); 
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchTitle();
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
      {title}
    </div>
  );
};

export default Title;