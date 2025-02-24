import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  const [intervalId, setIntervalId] = useState(null);
  const [uptimes, setUptimes] = useState({});

  const formatUptime = (uptimeInSeconds) => {
    const days = Math.floor(uptimeInSeconds / (24 * 3600));
    const hours = Math.floor((uptimeInSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = uptimeInSeconds % 60;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return days > 0 ? `${days}d ${formattedTime}` : formattedTime;
  };

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

  const fetchMetrics = async (vm_id, status) => {
    if (['creating', 'configuring', 'shutting down', 'stopped'].includes(status)) {
      setUptimes(prev => ({ ...prev, [vm_id]: 0 }));
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/v1/vm/metrics?vmid=${vm_id}`, {
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
      if (data.metrics.length > 0) {
        setUptimes(prev => ({ ...prev, [vm_id]: data.metrics[0].uptime }));
      }
    } catch (error) {
      console.error('Ошибка при получении метрик:', error);
    }
  };

  useEffect(() => {
    fetchVms(); 

    const id = setInterval(() => {
      fetchVms(); 
    }, updateInterval);
    setIntervalId(id);

    return () => clearInterval(id); 
  }, [projectId, updateInterval]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      vms.forEach(vm => {
        fetchMetrics(vm.vm_id, vm.status); 
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [vms]);

  const handleButtonClick = () => {
    setIsUpdating(true);
    setUpdateInterval(1000);

    if (intervalId) {
      clearInterval(intervalId);
    }

    const id = setInterval(() => {
      fetchVms();
    }, 1000);
    setIntervalId(id);

    setTimeout(() => {
      clearInterval(id);
      setUpdateInterval(7000);
      fetchVms();
      const newId = setInterval(() => {
        fetchVms();
      }, 1000);
      setIntervalId(newId);
    }, 22000);
  };

  const isButtonDisabled = (status, action) => {
    const disabledActions = {
      creating: true,
      configuring: true,
      rebooting: true,
      resetting: true,
      destroying: true,
      starting: true,
      'shutting down': true,
      stopping: true,
      running: action === 'start' || action === 'destroy',
      stopped: action !== 'start' && action !== 'destroy',
    };
    return disabledActions[status] || false;
  };

  const getBorderColor = (status) => {
    switch (status) {
      case 'running':
        return '#25C230';
      case 'stopped':
        return '#7C7A8C';
      default:
        return 'yellow';
    }
  };

  if (error) {
    return <div className="error-message">Ошибка: {error}</div>; 
  }

  return (
    <div className="vms-container">
      <div className="vms-list">
        {vms.length > 0 ? (
          vms.map(vm => (
            <div className="vm-item" key={vm.vm_id} style={{ border: `2px solid ${getBorderColor(vm.status)}` }}>
              <div className="vm-header">
                <div className="vm-purpose-uptime">
                  <p>{vm.vm_purpose}</p>
                  <p>{formatUptime(uptimes[vm.vm_id] || 0)}</p>
                </div>
                <SettingsButton 
                  title="Настройки" 
                  vm_id={vm.vm_id} 
                  projectId={projectId} 
                  cpu={vm.configuration[0].cpu}
                  ram={vm.configuration[0].ram}
                  buttons={{
                    stop: {
                      title: "Остановить",
                      disabled: isButtonDisabled(vm.status, 'stop'),
                      onClick: handleButtonClick,
                    },
                    reset: {
                      title: "Сбросить",
                      disabled: isButtonDisabled(vm.status, 'reset'),
                      onClick: handleButtonClick,
                    },
                    destroy: {
                      title: "Уничтожить",
                      disabled: isButtonDisabled(vm.status, 'destroy'),
                      onClick: handleButtonClick,
                    },
                  }}
                />
              </div>
              <Metrics vm_id={vm.vm_id} status={vm.status} />
              {vm.configuration.map((config, index) => (
                <div key={index}>
                  <div className="load-box" style={{ width: `${config.cpuLoad}%` }} />
                  <p>Status: {vm.status}</p>
                  <div className="load-box" style={{ width: `${config.ramLoad}%` }} />
                </div>
              ))}
              <div className="action-buttons">
                {vm.status === 'starting' || vm.status === 'running' ? (
                  <>
                    <ShutdownButton 
                      vm_id={vm.vm_id} 
                      project_id={projectId} 
                      title="Выключить" 
                      onClick={handleButtonClick} 
                      disabled={isButtonDisabled(vm.status, 'shutdown')}
                    />
                    <RebootButton 
                      vm_id={vm.vm_id} 
                      project_id={projectId} 
                      title="Перезагрузить" 
                      onClick={handleButtonClick} 
                      disabled={isButtonDisabled(vm.status, 'reboot')}
                    />
                  </>
                ) : vm.status === 'shutting down' || vm.status === 'stopped' ? (
                  <>
                    <StartButton 
                      vm_id={vm.vm_id} 
                      project_id={projectId} 
                      title="Включить" 
                      onClick={handleButtonClick} 
                      disabled={isButtonDisabled(vm.status, 'start')}
                    />
                    <RebootButton 
                      vm_id={vm.vm_id} 
                      project_id={projectId} 
                      title="Перезагрузить" 
                      onClick={handleButtonClick} 
                      disabled={isButtonDisabled(vm.status, 'reboot')}
                    />
                  </>
                ) : (
                  <>
                    <StartButton 
                      vm_id={vm.vm_id} 
                      project_id={projectId} 
                      title="Запустить" 
                      onClick={handleButtonClick} 
                      disabled={isButtonDisabled(vm.status, 'start')}
                    />
                    <ShutdownButton 
                      vm_id={vm.vm_id} 
                      project_id={projectId} 
                      title="Выключить" 
                      onClick={handleButtonClick} 
                      disabled={isButtonDisabled(vm.status, 'shutdown')}
                    />
                    <RebootButton 
                      vm_id={vm.vm_id} 
                      project_id={projectId} 
                      title="Перезагрузить" 
                      onClick={handleButtonClick} 
                      disabled={isButtonDisabled(vm.status, 'reboot')}
                    />
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          console.log('No virtual machines available.')
        )}
      </div>
      {vms.length < 3 && (
        <div className="machine-selection-container">
          <MachineSelection project_id={projectId} />
        </div>
      )}
    </div>
  );
};

export default VirtualMachines;