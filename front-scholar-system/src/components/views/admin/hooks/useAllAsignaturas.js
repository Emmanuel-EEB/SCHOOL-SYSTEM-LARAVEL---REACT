import { useState, useEffect } from 'react';
import apiClient from '../../../../apiService';

const useFetchAsignaturas = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAsignaturas = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/admin/allasignaturas');
      setAsignaturas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las Asignaturas:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsignaturas();
  }, []);

  return { asignaturas, loading, fetchAsignaturas };
};

export default useFetchAsignaturas;
