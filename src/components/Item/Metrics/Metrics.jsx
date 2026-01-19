import React, { useEffect, useState } from 'react';

const Metrics = ({ vm_id, status }) => {
  const [metrics, setMetrics] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchMetrics = async () => {
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
        setMetrics(data.metrics);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    if (['creating', 'configuring', 'shutting down', 'stopped'].includes(status)) {
      if (status === 'stopped') {
        setMetrics([{ vmid: vm_id, cpu: 0, mem: 0, maxmem: 1 }]);
      } else {
        setMetrics([{ vmid: vm_id, cpu: 0, mem: 0, maxmem: 1 }]); 
      }
    } else {
      fetchMetrics();
      const intervalId = setInterval(fetchMetrics, 1000);

      return () => clearInterval(intervalId);
    }
  }, [apiUrl, status, vm_id]);

  const renderMetricBar = (label, value, maxValue, isCpu = false) => {
    const percentage = (value / maxValue) * 100;

    return (
      <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '4px' }}>{label}:</span>
        <div style={{ height: '12px', backgroundColor: 'rgba(62, 59, 86, 1)', borderRadius: '4px', overflow: 'hidden', marginLeft: isCpu ? '6px' : '0', width: '70px' }}>
          <div style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: percentage > 80 ? 'red' : 'rgba(37, 194, 48, 1)',
            transition: 'width 0.5s ease-in-out'
          }} />
        </div>
        <span style={{ marginLeft: '4px' }}>{Math.round(percentage)}%</span>
      </div>
    );
  };

  return (
    <div
      style={{
        marginTop: '0px',
        minHeight: '30px',
        backgroundColor: '#534F73',
        width: '100%',
        wordWrap: 'break-word',
      }}
    >
      {metrics.map((metric) => (
        <div key={metric.vmid}>
          {renderMetricBar('CPU', metric.cpu * 100, 100, true)} 
          {renderMetricBar('RAM', metric.mem, metric.maxmem)}
        </div>
      ))}
    </div>
  );
};

export default Metrics;