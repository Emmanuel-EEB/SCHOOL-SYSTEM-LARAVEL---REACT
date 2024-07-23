import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { getAuthToken } from '../../../../apiService';
import SpinerLoading from '../../../reusable-components/SpinerLoading';

export default function Docente() {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de estudiantes
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

    fetchDocentes();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDocentes = teachers.filter((docente) => {
    return (
        docente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        docente.rut.toLowerCase().includes(searchTerm.toLowerCase()) ||
        docente.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex-grow overflow-y-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Sección Docentes</h1>

      <div className="relative mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-l-md px-4 py-2 w-full"
          placeholder="Buscar por nombre, rut o email"
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

      {loading ? ( // Mostrar spinner de carga mientras se obtienen los estudiantes
        <SpinerLoading/>
      ) : filteredDocentes.length === 0 ? ( // Mostrar mensaje si no hay estudiantes
        <p className="text-center text-gray-600">No se encontraron docentes...</p>
      ) : (
        <div className="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Rut</th>
                <th className="py-3 px-6 text-left">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDocentes.map((student) => (
                <tr key={student.id} className="hover:bg-gray-100">
                  <td className="py-4 px-6">{student.name}</td>
                  <td className="py-4 px-6">{student.rut}</td>
                  <td className="py-4 px-6">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
