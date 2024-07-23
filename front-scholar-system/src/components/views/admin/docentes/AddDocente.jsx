import React, { useEffect, useState } from 'react';
import apiClient, { getAuthToken } from '../../../../apiService';
import { useNavigate } from 'react-router-dom';
import { MagicMotion } from 'react-magic-motion';
import SpinerLoading from '../../../reusable-components/SpinerLoading';

export default function AddDocente() {
  const [formData, setFormData] = useState({
    name: '',
    rut: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const passwordValue = formData.rut;
    try {
      const response = await apiClient.post('/admin/registerdc', {
        ...formData,
        password: passwordValue,
        password_confirmation: passwordValue,
      });
      console.log('Docente agregado:', response.data);
      setSuccessMessage('Docente agregado correctamente.');
      setFormData({
        name: '',
        rut: '',
        email: '',
        password: '',
        password_confirmation: '',
      });
      setErrors({});
      fetchTeachers();
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ global: 'Error al conectar con el servidor.' });
      }
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/admin/alldocentes');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error al obtener los docentes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          navigate('/admin/authAdmin');
        }
      } catch (error) {
        console.error('Error al verificar la autenticación:', error);
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter((teacher) => {
    return (
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.rut.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
      <div className="md:flex gap-4">
        <MagicMotion>
          <div className="md:w-1/3 flex flex-col justify-center bg-white p-6 rounded-lg shadow-md h-1/2 mb-2"> {/* Altura fija */}
            <h1 className="text-2xl font-semibold mb-4 text-center">Agregar Docente</h1>
            {errors.global && <p className="text-red-500 mb-2 text-center">{errors.global}</p>}
            {successMessage && (
              <p className="text-green-500 mb-2 text-center font-bold text-xl">{successMessage}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre:
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 w-full`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="rut" className="block text-sm font-medium text-gray-700">
                  Rut:
                </label>
                <input
                  id="rut"
                  type="text"
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                  className={`border ${errors.rut ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 w-full`}
                />
                {errors.rut && <p className="text-red-500 text-sm mt-1">{errors.rut}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 w-full`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white rounded-md py-2 mt-4 hover:bg-gray-800 transition duration-300"
              >
                Agregar Docente
              </button>
            </form>
          </div>
        </MagicMotion>
        <div className="flex-grow bg-white p-6 rounded-lg shadow-md mb-4">
          <div className="relative mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded-l-md px-4 py-2 w-full "
              placeholder="Buscar por nombre, rut o email"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <button
              type="button"
              className="bg-gray-900 text-white rounded-r-md px-4 py-2 absolute right-0 top-0 bottom-0 m-auto hover:bg-gray-700 transition duration-300"
            >
              Buscar
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center">
              <SpinerLoading />
            </div>
          ) : filteredTeachers.length === 0 ? (
            <p className="text-center text-gray-600">No se encontraron docentes.</p>
          ) : (
            <MagicMotion>
              <div className="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-900 text-white">
                    <tr>
                      <th className="py-3 px-6 text-left">Nombre</th>
                      <th className="py-3 px-6 text-left">Rut</th>
                      <th className="py-3 px-6 text-left">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredTeachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-100">
                        <td className="py-4 px-6">{teacher.name}</td>
                        <td className="py-4 px-6">{teacher.rut}</td>
                        <td className="py-4 px-6">{teacher.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </MagicMotion>
          )}
        </div>
      </div>
    </div>
  );
}
