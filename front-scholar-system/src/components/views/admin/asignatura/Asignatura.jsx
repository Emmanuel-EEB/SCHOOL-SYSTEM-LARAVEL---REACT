import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { getAuthToken } from '../../../../apiService';
import SpinerLoading from '../../../reusable-components/SpinerLoading';

export default function Asignatura() {
  const [asignaturas, setAsignaturas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de cursos
  const navigate = useNavigate();

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
    const fetchAsignaturas = async () => {
      try {
        const response = await apiClient.get('/admin/allasignaturas');
        setAsignaturas(response.data);
        setLoading(false); // Cuando se completa la carga, se cambia el estado de carga
      } catch (error) {
        console.error('Error al obtener las asignaturas:', error);
        setLoading(false); // En caso de error también se cambia el estado de carga
      }
    };

    fetchAsignaturas();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAsignaturas = asignaturas.filter((asignatura) => {
    return (
        asignatura.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex-grow overflow-y-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Sección Asignaturas</h1>

      <div className="relative mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-l-md px-4 py-2 w-full"
          placeholder="Buscar por código o nombre"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <button
          type="button"
          className="bg-gray-800 text-white rounded-r-md px-4 py-2 absolute right-0 top-0 bottom-0 m-auto"
        >
          Buscar
        </button>
      </div>

      {loading ? ( // Mostrar spinner de carga mientras se obtienen los cursos
        <SpinerLoading />
      ) : filteredAsignaturas.length === 0 ? ( // Mostrar mensaje si no hay cursos
        <p className="text-center text-gray-600">No se encontraron asignaturas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAsignaturas.map((asignatura) => (
            <div key={asignatura.id} className="bg-white text-center shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-4">
                <p className="text-gray-600 mb-2">{asignatura.nombre}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
