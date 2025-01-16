import React from 'react';
import { modalStyles } from './ConfirmationModal.styles';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <h2>Подтверждение</h2>
          <button style={modalStyles.closeButton} onClick={onClose}>✖</button>
        </div>
        <p>Вы уверены, что хотите подтвердить?</p>
        <div style={modalStyles.buttonContainer}>
          <button onClick={() => {
            onConfirm();
            onClose();
          }} style={modalStyles.okButton}>
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;