import React, { useEffect, useState } from 'react';
import apiClient from '../../../../apiService';
import SpinerLoading from '../../../reusable-components/SpinerLoading';

export default function AddAsignatura() {
  const [formData, setFormData] = useState({
    nombre: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [asignaturas, setAsignaturas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.post('/admin/registeras', formData);
      console.log('Asignatura agregada:', response.data);
      setSuccessMessage('Asignatura agregada correctamente.');
      setFormData({ nombre: '' });
      setErrors({});
      fetchAsignaturas();
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

  const fetchAsignaturas = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/admin/allasignaturas');
      setAsignaturas(response.data);
    } catch (error) {
      console.error('Error al obtener las asignaturas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsignaturas();
  }, []);

  const filteredAsignaturas = asignaturas.filter((asignatura) => {
    return (
      asignatura.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
      <div className="md:flex gap-4">
        <div className="md:w-1/3 flex flex-col justify-center bg-white p-6 rounded-lg shadow-md h-1/2 mb-2">
          <h1 className="text-2xl font-semibold text-center">Agregar Asignatura</h1>
          {errors.global && <p className="text-red-500 mb-2 text-center">{errors.global}</p>}
          {successMessage && (
            <p className="text-green-500 mb-2 text-center font-bold text-xl">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre:
              </label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white rounded-md py-2 mt-4 hover:bg-gray-800 transition duration-300"
            >
              Agregar Asignatura
            </button>
          </form>
        </div>
        <div className="flex-grow bg-white p-6 rounded-lg shadow-md mb-4">
          <div className="relative mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <button
              type="button"
              className="bg-gray-900 text-white rounded-r-md px-4 py-2 absolute right-0 top-0 bottom-0 m-auto hover:bg-blue-700 transition duration-300"
            >
              Buscar
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center">
              <SpinerLoading />
            </div>
          ) : filteredAsignaturas.length === 0 ? (
            <p className="text-center text-gray-600">No se encontraron asignaturas.</p>
          ) : (
            <div className="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">Nombre</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAsignaturas.map((asignatura) => (
                    <tr key={asignatura.id} className="hover:bg-gray-100">
                      <td className="py-4 px-6">{asignatura.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
