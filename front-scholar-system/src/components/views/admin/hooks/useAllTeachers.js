import { useState, useEffect } from 'react';
import apiClient from '../../../../apiService';

const useFetchTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocentes = async () => {
    try {
      const response = await apiClient.get('/admin/alldocentes');
      setTeachers(response.data);
      setLoading(false); // Cuando se completa la carga, se cambia el estado de carga
    } catch (error) {
      console.error('Error al obtener los docentes:', error);
      setLoading(false); // En caso de error también se cambia el estado de carga
    }
  };

  useEffect(() => {
    fetchDocentes();
  }, []);

  return { teachers, loading, fetchDocentes };
};

export default useFetchTeachers;
