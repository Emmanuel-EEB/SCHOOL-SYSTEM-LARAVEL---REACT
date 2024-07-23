import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { getAuthToken } from '../../../../apiService';
import SpinerLoading from '../../../reusable-components/SpinerLoading';
import useFetchStudents from '../hooks/useAllStudent';

export default function AddStCur() {
  const { students, loading: loadingStudents, fetchStudents } = useFetchStudents();
  const [cursos, setCursos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
    const fetchCursos = async () => {
      try {
        const response = await apiClient.get('/admin/allcursos');
        setCursos(response.data);
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
      }
    };

    fetchCursos();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCursos = cursos.filter((curso) => {
    return (
      curso.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleCursoClick = (curso) => {
    setSelectedCurso(curso);
  };

  const handleAssignCurso = async (studentId, cursoId) => {
    try {
      await apiClient.put(`/admin/updateStudentCurso/${studentId}`, {
        curso_id: cursoId,
      });
      fetchStudents();
      setSelectedStudent(null);
      const assignedCurso = cursos.find((curso) => curso.id === parseInt(cursoId));
      setSuccessMessage(`Curso "${assignedCurso.codigo}" asignado exitosamente.`);
      setErrorMessage('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error al asignar curso:', error);
      setErrorMessage('Hubo un error al asignar el curso. Inténtalo de nuevo.');
      setSuccessMessage('');
    }
  };

  const filteredStudents = students.filter((student) => {
    if (selectedCurso === null) {
      return student.curso_id === null;
    }
    return student.curso_id === selectedCurso.id;
  });

  const getCursoCodigo = (cursoId) => {
    const curso = cursos.find((curso) => curso.id === cursoId);
    return curso ? curso.codigo : 'No Asignado';
  };

  return (
    <div className="flex-grow overflow-y-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Lista de Cursos y Estudiantes</h1>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {errorMessage}
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Cursos</h2>

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

        {filteredCursos.length === 0 ? (
          <p className="text-center text-gray-600">No se encontraron cursos.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCursos.map((curso) => (
              <div
                key={curso.codigo}
                className={`bg-white text-center shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
                  selectedCurso?.id === curso.id ? 'border-2 border-blck' : ''
                }`}
                onClick={() => handleCursoClick(curso)}
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{curso.codigo}</h2>
                  <p className="text-gray-600 mb-2">{curso.nombre}</p>
                </div>
              </div>
            ))}
            <div
              className={`bg-white text-center shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
                selectedCurso === null ? 'border-2 border-black' : ''
              }`}
              onClick={() => handleCursoClick(null)}
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">Sin Asignar</h2>
                <p className="text-gray-600 mb-2">Estudiantes sin curso</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Estudiantes</h2>

        {loadingStudents ? (
          <SpinerLoading />
        ) : filteredStudents.length === 0 ? (
          <p className="text-center text-gray-600">No se encontraron estudiantes.</p>
        ) : (
          <div className="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Nombre</th>
                  <th className="py-3 px-6 text-left">Rut</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Curso</th>
                  <th className="py-3 px-6 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-100">
                    <td className="py-4 px-6">{student.name}</td>
                    <td className="py-4 px-6">{student.rut}</td>
                    <td className="py-4 px-6">{student.email}</td>
                    <td className="py-4 px-6">{student.curso_id ? getCursoCodigo(student.curso_id) : 'No Asignado'}</td>
                    <td className="py-4 px-6">
                      {student.curso_id === null ? (
                        <>
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => setSelectedStudent(student.id)}
                          >
                            Asignar Curso
                          </button>
                          {selectedStudent === student.id && (
                            <div className="relative mt-2">
                              <select
                                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                onChange={(e) => handleAssignCurso(student.id, e.target.value)}
                              >
                                <option value="">Selecciona un curso</option>
                                {cursos.map((curso) => (
                                  <option key={curso.id} value={curso.id}>
                                    {curso.nombre}
                                  </option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                  <path d="M5.516 7.548l4.485 4.486 4.486-4.486-1.06-1.06-3.426 3.426-3.426-3.426z" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <span>Curso Asignado</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
