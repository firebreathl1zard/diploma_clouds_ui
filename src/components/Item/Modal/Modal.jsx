import React, { useState } from 'react';
import { modalStyles } from './Modal.styles';

const Modal = ({ isOpen, onClose, onConfirm, vmConfigurations, setSelectedVM }) => {
  const [selectedVM, setSelectedVMState] = useState(null);
  const [purpose, setPurpose] = useState('');

  const handleConfirm = () => {
    if (selectedVM && purpose) {
      onConfirm({ vm: selectedVM, purpose });
      onClose();
    } else {
      alert('Пожалуйста, выберите конфигурацию ВМ и назначение.');
    }
  };

  if (!isOpen) return null;

  console.log('VM Configurations:', vmConfigurations);

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <h2 style={modalStyles.title}>Выбор конфигурации ВМ</h2>
          <button style={modalStyles.closeButton} onClick={onClose}>✖</button>
        </div>
        <h3 style={modalStyles.subtitle}>Vm конфигурации:</h3>
        <div style={modalStyles.vmList}>
          {vmConfigurations.length > 0 ? (
            vmConfigurations.map((vm) => (
              <div key={vm.id} style={modalStyles.vmItem}>
                <label style={{ ...modalStyles.vmName, backgroundColor: selectedVM === vm ? '#e0f7fa' : 'transparent' }}>
                  <input
                    type="radio"
                    name="vmConfiguration"
                    checked={selectedVM === vm}
                    onChange={() => {
                      setSelectedVMState(vm);
                      setSelectedVM(vm);
                    }}
                    style={{ marginRight: '10px' }}
                  />
                  {vm.id}. {vm.name}
                </label>
              </div>
            ))
          ) : (
            <p>Нет доступных конфигураций ВМ.</p>
          )}
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

        <h3 style={modalStyles.subtitle}>Выберите назначение:</h3>
        <div>
          <label>
            <input
              type="radio"
              name="purpose"
              value="FE"
              checked={purpose === 'FE'}
              onChange={(e) => setPurpose(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            Frontend
          </label>
          <label>
            <input
              type="radio"
              name="purpose"
              value="BE"
              checked={purpose === 'BE'}
              onChange={(e) => setPurpose(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            Backend
          </label>
          <label>
            <input
              type="radio"
              name="purpose"
              value="DB"
              checked={purpose === 'DB'}
              onChange={(e) => setPurpose(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            Database
          </label>
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