import React, { useEffect, useState } from 'react';
import MachineSelection from './MachineSelection/MachineSelection';
import StartButton from './Vmdisplay/StartButton';
import ShutdownButton from './Vmdisplay/ShutdownButton';
import StopButton from './Vmdisplay/StopButton';
import RebootButton from './Vmdisplay/RebootButton';
import ResetButton from './Vmdisplay/ResetButton';
import DestroyButton from './Vmdisplay/DestroyButton';
import SettingsButton from './Vmdisplay/SettingsButton'; 
import '../../styles/Vmdisplay.css';

const VirtualMachines = ({ projectId }) => {
  const [vms, setVms] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState('');

  useEffect(() => {
    const fetchVms = async () => {
      try {
        const response = await fetch(`http://10.3.21.200:8000/api/v1/project/${projectId}/vms`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data.vminfo)) {
          setVms(data.vminfo);
        } else {
          setVms([]); 
        }
      } catch (error) {
        setError(error.message); 
        console.error('Ошибка при получении данных о виртуальных машинах:', error);
      }
    };

    fetchVms();
  }, [projectId]);

  if (error) {
    return <div className="error-message">Ошибка: {error}</div>; 
  }

  return (
    <div className="vms-container">
      {vms.length > 0 ? (
        vms.map(vm => (
          <div key={vm.vm_identifier} className="vm-item">
            <p>VM ID: {vm.vm_identifier}</p>
            <p>IP Address: {vm.vm_ip_address}</p>
            <p>Status: {vm.status}</p>
            <p>Purpose: {vm.vm_purpose}</p>
            {vm.configuration.map((config, index) => (
              <p key={index}>CPU: {config.cpu}, RAM: {config.ram} GB</p>
            ))}
          </div>
        ))
      ) : (
        <MachineSelection project_id={projectId} onPurposeSelect={setSelectedPurpose} />
      )}
      {selectedPurpose && <p>Выбранное назначение: {selectedPurpose}</p>} 
    </div>
  );
};

export default VirtualMachines;