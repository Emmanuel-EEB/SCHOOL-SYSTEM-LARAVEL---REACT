import { useState, useEffect } from 'react';
import apiClient from '../../../../apiService';

const useFetchCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCursos = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/admin/allcursos');
      setCursos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los Cursos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  return { cursos, loading, fetchCursos };
};

export default useFetchCursos;
