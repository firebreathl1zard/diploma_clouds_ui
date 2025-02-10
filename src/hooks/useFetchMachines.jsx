import { useEffect, useState } from 'react';

const useFetchMachines = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await fetch(`${apiUrl}/v1/vm/confs`,{
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