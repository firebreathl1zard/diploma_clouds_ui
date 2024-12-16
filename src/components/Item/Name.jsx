import React, { useState, useEffect, useCallback } from 'react';

const Name = ({ title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]); 

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        style={{
          backgroundColor: 'white',
          border: '1px solid black',
          borderRadius: '3px',
          padding: '5px',
          width: 'fit-content',
          cursor: 'pointer' 
        }}
        onClick={openModal} 
      >
        {title}
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            position: 'relative',
            width: '300px',
            textAlign: 'center',
          }}>
            <button onClick={closeModal} style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}>✖</button>
            <h2>{title}</h2>
            <p>Это модальное окно для отображения названия элемента.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Name;