import { useState, useEffect } from 'react';
import apiClient from '../../../../apiService';

const useFetchTeachersAsignaturas = () => {
  const [teachersAsignaturas, setTeachersAsignaturas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachersAsignaturas = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/admin/teacher-asignatura');
      setTeachersAsignaturas(response.data.data); // Asegúrate de ajustar esto según la estructura de tu respuesta API
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los docentes y sus asignaturas:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachersAsignaturas();
  }, []);

  return { teachersAsignaturas, loading, fetchTeachersAsignaturas };
};

export default useFetchTeachersAsignaturas;
