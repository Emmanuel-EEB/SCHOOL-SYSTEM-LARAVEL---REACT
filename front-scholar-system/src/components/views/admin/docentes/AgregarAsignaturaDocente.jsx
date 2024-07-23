import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpinerLoading from '../../../reusable-components/SpinerLoading';
import useAllAsignaturas from '../hooks/useAllAsignaturas';
import useAllTeachersAsignaturas from '../hooks/useAllTeachersAsignaturas';
import axios from 'axios';

export default function AgregarAsignaturaDocente() {
  const { teachersAsignaturas, loading: loadingTeachersAsignaturas, fetchTeachersAsignaturas } = useAllTeachersAsignaturas();
  const { asignaturas, loading: loadingAsignaturas, fetchAsignaturas } = useAllAsignaturas();
  const [searchTermAsignaturas, setSearchTermAsignaturas] = useState('');
  const [searchTermTeachers, setSearchTermTeachers] = useState('');
  const [selectedAsignaturas, setSelectedAsignaturas] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/admin/authAdmin');
        }
      } catch (error) {
        console.error('Error al verificar la autenticación:', error);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSearchTermAsignaturasChange = (event) => {
    setSearchTermAsignaturas(event.target.value);
  };

  const handleSearchTermTeachersChange = (event) => {
    setSearchTermTeachers(event.target.value);
  };

  const handleAsignaturaClick = (asignaturaId) => {
    setSelectedAsignaturas((prevSelected) =>
      prevSelected.includes(asignaturaId)
        ? prevSelected.filter((id) => id !== asignaturaId)
        : [...prevSelected, asignaturaId]
    );
  };

  const handleAddAsignaturasToTeacher = async (teacherId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/teachers/${teacherId}/asignaturas`,
        { asignaturas: selectedAsignaturas },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh data and clear state
      fetchTeachersAsignaturas();
      fetchAsignaturas();
      setSelectedTeacher(null);
      setSelectedAsignaturas([]);
      setMessage({ type: 'success', text: response.data.message });
    } catch (error) {
      console.error('Error al agregar asignaturas al docente:', error);
      setMessage({ type: 'error', text: 'Hubo un error al agregar asignaturas al docente.' });
    }
  };

  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
    setSelectedAsignaturas([]);
    setSearchTermAsignaturas('');
  };

  const filteredAsignaturas = asignaturas.filter((asignatura) =>
    asignatura.nombre.toLowerCase().includes(searchTermAsignaturas.toLowerCase()) &&
    (!selectedTeacher || !selectedTeacher.asignaturas.includes(asignatura.nombre))
  );

  const filteredTeachers = teachersAsignaturas.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTermTeachers.toLowerCase())
  );

  return (
    <div className="flex-grow overflow-y-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Asignar Asignatura a un Docente</h1>

      {message && (
        <div className={`mb-4 p-4 text-center rounded-md ${message.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Asignaturas</h2>
          <div className="relative mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Buscar por nombre"
              value={searchTermAsignaturas}
              onChange={handleSearchTermAsignaturasChange}
            />
          </div>
          {loadingAsignaturas ? (
            <SpinerLoading />
          ) : filteredAsignaturas.length === 0 ? (
            <p className="text-center text-gray-600">No se encontraron asignaturas para asignar.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAsignaturas.map((asignatura) => (
                <div
                  key={asignatura.id}
                  className={`bg-white text-center shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 ${
                    selectedAsignaturas.includes(asignatura.id) ? 'border-green-500' : 'border-transparent'
                  }`}
                  onClick={() => handleAsignaturaClick(asignatura.id)}
                >
                  <div className="p-4">
                    <p className="text-gray-600 mb-2">{asignatura.nombre}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Docentes</h2>
          <div className="relative mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Buscar por nombre"
              value={searchTermTeachers}
              onChange={handleSearchTermTeachersChange}
            />
          </div>
          {loadingTeachersAsignaturas ? (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-center">Cargando...</h3>
              <p className="text-center text-gray-600">Esperando datos...</p>
            </div>
          ) : filteredTeachers.length === 0 ? (
            <p className="text-center text-gray-600">No se encontraron docentes.</p>
          ) : (
            <div className="flex flex-wrap">
              {filteredTeachers.map((teacher) => (
                <div key={teacher.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
                  <div
                    className={`bg-white p-4 rounded-lg shadow-md cursor-pointer border-2 ${
                      selectedTeacher && selectedTeacher.id === teacher.id ? 'border-green-500' : 'border-transparent'
                    }`}
                    onClick={() => handleTeacherClick(teacher)}
                  >
                    <h2 className="text-xl font-semibold mb-4 text-center">{teacher.name}</h2>
                    <ul>
                      {teacher.asignaturas.length > 0 ? (
                        teacher.asignaturas.map((asignatura, index) => (
                          <li key={index} className="text-gray-600">{asignatura}</li>
                        ))
                      ) : (
                        <li className="text-gray-600">No hay asignaturas asignadas a este docente.</li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedTeacher && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">{selectedTeacher.name}</h2>
          <p className="text-center text-gray-600 mb-4">Asignaturas en este docente:</p>
          <ul className="mb-4">
            {selectedTeacher.asignaturas.length > 0 ? (
              selectedTeacher.asignaturas.map((asignatura, index) => (
                <li key={index} className="text-gray-600">{asignatura}</li>
              ))
            ) : (
              <li className="text-gray-600">No hay asignaturas asignadas a este docente.</li>
            )}
          </ul>
          <h2 className="text-xl font-semibold mb-4 text-center">Asignaturas Seleccionadas</h2>
          <ul>
            {selectedAsignaturas.map((asignaturaId) => {
              const asignatura = asignaturas.find(a => a.id === asignaturaId);
              return <li key={asignaturaId} className="text-gray-600">{asignatura ? asignatura.nombre : 'Asignatura no encontrada'}</li>
            })}
          </ul>
          <button
            onClick={() => handleAddAsignaturasToTeacher(selectedTeacher.id)}
            className='bg-gray-900 text-white rounded-md p-2 mt-4 block mx-auto'
          >
            Agregar Asignaturas
          </button>
        </div>
      )}
    </div>
  );
}
