import { useState, useEffect } from 'react';
import apiClient from '../../../../apiService';

const useFetchCursosAsignaturas = () => {
  const [cursosAsignaturas, setCursosAsignaturas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCursosAsignaturas = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/admin/curso-asignatura');
      setCursosAsignaturas(response.data.data); // Asegúrate de ajustar esto según la estructura de tu respuesta API
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los Cursos y Asignaturas:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursosAsignaturas();
  }, []);

  return { cursosAsignaturas, loading, fetchCursosAsignaturas };
};

export default useFetchCursosAsignaturas;
