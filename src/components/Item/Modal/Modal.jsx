import React, { useState } from 'react';
import { modalStyles } from './Modal.styles';

const Modal = ({ isOpen, onClose, onConfirm, vmConfigurations, setSelectedVM }) => {
  const [sshKey, setSshKey] = useState('');
  const [selectedVM, setSelectedVMState] = useState(null); 
  const [error, setError] = useState(''); 

  const validateSshKey = (key) => {
    
    const sshKeyPattern = /^ssh-(rsa|dss|ed25519|ecdsa) [A-Za-z0-9+/=]+( .+)?$/;
    return sshKeyPattern.test(key);
  };

  const handleConfirm = () => {
    if (validateSshKey(sshKey)) {
      setError(''); 
      onConfirm(sshKey);
      onClose();
    } else {
      setError('Неверный формат SSH ключа. Пожалуйста, проверьте и попробуйте снова.');
    }
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button style={modalStyles.closeButton} onClick={onClose}>✖</button>
        <h2 style={modalStyles.title}>Выбор конфигурации ВМ</h2>
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

        <p>
          Введите SSH ключ 
          <span style={modalStyles.tooltipContainer}>
            <a 
              href="https://tretyakov.net/post/kak-prosmotret-svoi-ssh-klyuchi-v-raznyh-os/"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src="https://cdn.icon-icons.com/icons2/38/PNG/512/help_question_4509.png" 
                alt="Help" 
                style={modalStyles.helpIcon} 
              />
            </a>
            <span style={modalStyles.tooltip}>Где найти SSH ключ?</span>
          </span>
        </p>
        <input
          type="text"
          placeholder="Введите SSH ключ"
          value={sshKey}
          onChange={(e) => setSshKey(e.target.value)}
          style={modalStyles.input}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>} 

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