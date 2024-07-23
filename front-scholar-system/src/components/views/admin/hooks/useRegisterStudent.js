import { useState } from 'react';
import apiService from '../../../../apiService';

const useRegisterStudent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerStudent = async (formData) => {
    setLoading(true);
    const postData = {
      ...formData,
      password: formData.rut,
      password_confirmation: formData.rut,
    };
    try {
      const response = await apiService.post('/admin/registerst', postData);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, registerStudent };
};

export default useRegisterStudent;
