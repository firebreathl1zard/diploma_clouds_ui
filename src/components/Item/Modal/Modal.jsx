import React, { useState } from 'react';
import { modalStyles } from './Modal.styles';

const Modal = ({ isOpen, onClose, onConfirm, vmConfigurations, setSelectedVM }) => {
  const [selectedVM, setSelectedVMState] = useState(null); 

  const handleConfirm = () => {
    if (selectedVM) {
      onConfirm(selectedVM);
      onClose();
    } else {
      alert('Пожалуйста, выберите конфигурацию ВМ.'); 
    }
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <h2 style={modalStyles.title}>Выбор конфигурации ВМ</h2>
          <button style={modalStyles.closeButton} onClick={onClose}>✖</button>
        </div>
        <h3 style={modalStyles.subtitle}>Vm конфигурации:</h3>
        <div style={modalStyles.vmList}>
          {vmConfigurations.map((vm) => (
            <div key={vm.id} style={modalStyles.vmItem}>
              <div
                onClick={() => {
                  setSelectedVMState(vm); 
                  setSelectedVM(vm);
                }}
                style={{
                  ...modalStyles.vmName,
                  backgroundColor: selectedVM === vm ? '#e0f7fa' : 'transparent', 
                }}
              >
                {vm.id}. {vm.name}
              </div>
            </div>
          ))}
        </div>

        <div style={modalStyles.vmDetails}>
          <h4>Выбранная конфигурация: {selectedVM ? selectedVM.name : 'Не выбрана'}</h4>
          {selectedVM ? (
            <>
              <p>CPU: {selectedVM.cpu}</p>
              <p>RAM: {selectedVM.ram} GB</p>
              <p>Storage: {selectedVM.storage} GB</p>
              <p>Cost: ${selectedVM.cost}</p>
            </>
          ) : (
            <p>Пожалуйста, выберите конфигурацию.</p>
          )}
        </div>

        <div style={modalStyles.buttonContainer}>
          <button onClick={handleConfirm} style={modalStyles.okButton}>
            ОК
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;