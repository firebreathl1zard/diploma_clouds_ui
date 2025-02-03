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
      <div className="machine-selection-container">
        <MachineSelection project_id={projectId} />
      </div>
      <div className="vms-list">
        {vms.length > 0 ? (
          vms.map(vm => (
            <div className="vm-item">
              <div className="vm-header">
                <p>BE/FE</p>
                <SettingsButton/>
              </div> 
              {vm.configuration.map((config, index) => (
                <div key={index}>
                  <p>CPU: {config.cpu}</p>
                  <div className="load-box" style={{ width: `${config.cpuLoad}%` }}>
                    <span>{config.cpuLoad}%</span>
                  </div>
                  <p>RAM: {config.ram}</p>
                  <div className="load-box" style={{ width: `${config.ramLoad}%` }}>
                    <span>{config.ramLoad}%</span>
                  </div>
                </div>
              ))}
              <div className="action-buttons">
                  <StartButton title="Запустить" />
                  <ShutdownButton title="Выключить" />
                  <StopButton title="Остановить" />
                  <RebootButton title="Перезагрузить" />
                  <ResetButton title="Сбросить" />
                  <DestroyButton title="Уничтожить" />
              </div>
            </div>
          ))
        ) : (
          <p>No virtual machines available.</p>
        )}
      </div>

    </div>
  );
};

export default VirtualMachines;