import React from 'react';
import { modalStyles } from './ConfirmationModal.styles';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <h2>Вы уверены, что хотите подтвердить?</h2>
          <button 
              style={{ 
                  ...modalStyles.closeButton, 
                  transition: 'color 0.3s' 
              }} 
              onClick={onClose}
              onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#4937D8'; 
              }} 
              onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'white'; 
              }}
          >
              &times;
          </button>
        </div>
        
        <div style={modalStyles.buttonContainer}>
        <button 
            onClick={() => {
                onConfirm();
                onClose();
            }} 
            style={{ 
                ...modalStyles.okButton, 
                transition: 'color 0.3s' 
            }} 
            onMouseEnter={(e) => {
                e.currentTarget.style.color = '#4937D8'; 
            }} 
            onMouseLeave={(e) => {
                e.currentTarget.style.color = 'white'; 
            }}
        >
            Подтвердить
        </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;