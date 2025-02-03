import { useEffect, useState } from 'react';

const useFetchMachines = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await fetch('http://10.3.21.200:8000/api/v1/vm/confs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMachines(data.vm_configurations);
      } catch (error) {
        setError(error);
        console.error('Ошибка при загрузке машин:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  return { machines, loading, error };
};

export default useFetchMachines;