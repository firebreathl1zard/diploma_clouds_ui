import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import useFetchMachines from '../../../hooks/useFetchMachines';
import { modalStyles } from './MachineSelection.styles';

const MachineSelection = ({ project_id, onPurposeSelect }) => {
  const { machines = [] } = useFetchMachines();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedVM, setSelectedVM] = useState(null); 
  const [purpose, setPurpose] = useState('');

  const handleConfirm = ({ vm, purpose }) => {
    console.log('Selected Purpose:', purpose); 
    setSelectedVM(vm);
    setPurpose(purpose);
    onPurposeSelect(purpose); 
    setIsConfirmModalOpen(true);
  };

  const handleFinalConfirm = async () => {
    if (selectedVM) {
      try {
        const response = await fetch('http://10.3.21.200:8000/api/v1/vm/create', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vmConfigurationID: String(selectedVM.id), 
            projectID: String(project_id),
            purpose: purpose, 
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Response from server:', data);
      } catch (error) {
        console.error('Error sending data to backend:', error);
      }
    }

    setIsModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  return (
    <div>
      <div style={modalStyles.addButtonContainer} onClick={() => setIsModalOpen(true)}>
        <button style={modalStyles.addButton}>+</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        vmConfigurations={machines}
        setSelectedVM={setSelectedVM} 
      />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleFinalConfirm}
      />
    </div>
  );
};

export default MachineSelection;