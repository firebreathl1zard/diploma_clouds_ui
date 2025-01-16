import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import useFetchMachines from '../../../hooks/useFetchMachines';
import { modalStyles } from './MachineSelection.styles';


const MachineSelection = ({ project_id }) => {
  console.log('Project ID:', project_id);
  const { machines } = useFetchMachines();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedVM, setSelectedVM] = useState(null); 
  const [sshKey, setSshKey] = useState('');

  const handleConfirm = (key) => {
    setSshKey(key);
    setIsConfirmModalOpen(true);
  };

  const handleFinalConfirm = async () => {
    if (selectedVM) {
      try {
        const response = await fetch('http://ivan.firebreathlizard.space:12000/api/v1/vm/create', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vmConfigurationID: String(selectedVM.id), 

            projectID: String(project_id),

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
    <div style={{ padding: '20px' }}>
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