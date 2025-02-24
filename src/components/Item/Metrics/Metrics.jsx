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

  const renderMetricBar = (label, value, maxValue) => {
    const percentage = (value / maxValue) * 100;

    return (
      <div style={{ marginBottom: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '4px' }}>{label}:</span>
          <div style={{ flex: 1, height: '14px', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden', marginRight: '4px' }}>
            <div style={{
              height: '100%',
              width: `${percentage}%`,
              backgroundColor: percentage > 80 ? 'red' : 'green',
              transition: 'width 0.5s ease-in-out'
            }} />
          </div>
          <span>{Math.round(percentage)}%</span>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        marginTop: '12px',
        minHeight: '30px',
        backgroundColor: '#534F73',
        width: '100%',
        wordWrap: 'break-word',
      }}
    >
      {metrics.map((metric) => (
        <div key={metric.vmid}>
          {renderMetricBar('CPU', metric.cpu * 100, 100)} 
          {renderMetricBar('RAM', metric.mem, metric.maxmem)}
        </div>
      ))}
    </div>
  );
};

export default Metrics;