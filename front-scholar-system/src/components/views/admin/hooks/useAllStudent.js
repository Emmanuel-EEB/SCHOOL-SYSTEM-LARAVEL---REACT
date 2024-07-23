import { useState, useEffect } from 'react';
import apiClient from '../../../../apiService';

const useFetchStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/admin/allstudents');
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los estudiantes:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, fetchStudents };
};

export default useFetchStudents;
