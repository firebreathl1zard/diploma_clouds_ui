import React, { useEffect, useState } from 'react';
import MachineSelection from './MachineSelection/MachineSelection';
import StartButton from './Vmdisplay/StartButton';
import ShutdownButton from './Vmdisplay/ShutdownButton';
import StopButton from './Vmdisplay/StopButton';
import RebootButton from './Vmdisplay/RebootButton';
import ResetButton from './Vmdisplay/ResetButton';
import DestroyButton from './Vmdisplay/DestroyButton';
import SettingsButton from './Vmdisplay/SettingsButton'; 
import Metrics from './Metrics/Metrics';
import '../../styles/Vmdisplay.css';

const VirtualMachines = ({ projectId }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [vms, setVms] = useState([]);
  const [error, setError] = useState(null);
  const [vmIds, setVmIds] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateInterval, setUpdateInterval] = useState(7000);

  const fetchVms = async () => {
    try {
      const response = await fetch(`${apiUrl}/v1/project/${projectId}/vms`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (Array.isArray(data.vminfo)) {
        setVms(data.vminfo);
        const ids = data.vminfo.map(vm => vm.vm_id);
        setVmIds(ids);
      } else {
        setVms([]); 
      }
    } catch (error) {
      setError(error.message); 
      console.error('Ошибка при получении данных о виртуальных машинах:', error);
    }
  };

  useEffect(() => {
    fetchVms(); 

    const intervalId = setInterval(() => {
      fetchVms(); 
    }, updateInterval);

    return () => clearInterval(intervalId); 
  }, [projectId, updateInterval]);

  const handleButtonClick = () => {
    setIsUpdating(true);
    setUpdateInterval(1000);

    setTimeout(() => {
      setIsUpdating(false);
      setUpdateInterval(7000);
    }, 30000);
  };

  if (error) {
    return <div className="error-message">Ошибка: {error}</div>; 
  }

  return (
    <div className="vms-container">
      <div className="vms-list">
        {vms.length > 0 ? (
          vms.map(vm => (
            <div className="vm-item" key={vm.vm_id}>
              <div className="vm-header">
                <p>{vm.vm_purpose}</p>
                <SettingsButton/>
              </div> 
              {vm.configuration.map((config, index) => (
                <div key={index}>
                  <p>CPU: {config.cpu}</p>
                  <div className="load-box" style={{ width: `${config.cpuLoad}%` }}>
                    {/* <span>{config.cpuLoad}%</span> */}
                  </div>
                  <p>RAM: {config.ram}</p>
                  <p>Status: {vm.status}</p>
                  <div className="load-box" style={{ width: `${config.ramLoad}%` }}>
                    {/* <span>{config.ramLoad}%</span> */}
                  </div>
                </div>
              ))}
              <div className="action-buttons">
                <StartButton vm_id={vm.vm_id} project_id={projectId} title="Запустить" onClick={handleButtonClick} />
                <ShutdownButton vm_id={vm.vm_id} project_id={projectId} title="Выключить" onClick={handleButtonClick} />
                <StopButton vm_id={vm.vm_id} project_id={projectId} title="Остановить" onClick={handleButtonClick} />
                <RebootButton vm_id={vm.vm_id} project_id={projectId} title="Перезагрузить" onClick={handleButtonClick} />
                <ResetButton vm_id={vm.vm_id} project_id={projectId} title="Сбросить" onClick={handleButtonClick} />
                <DestroyButton vm_id={vm.vm_id} project_id={projectId} title="Уничтожить" onClick={handleButtonClick} />
              </div>
              <Metrics vm_id={vm.vm_id}/>
            </div>
          ))
        ) : (
          <p>No virtual machines available.</p>
        )}
      </div>
      <div className="machine-selection-container">
        <MachineSelection project_id={projectId} />
      </div>
    </div>
  );
};

export default VirtualMachines;