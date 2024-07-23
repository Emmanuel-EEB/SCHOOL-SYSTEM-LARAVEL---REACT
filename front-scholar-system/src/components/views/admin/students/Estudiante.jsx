import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../../../apiService';
import SpinerLoading from '../../../reusable-components/SpinerLoading';
import useFetchStudents from '../hooks/useAllStudent';
import useAllCursos from '../hooks/useAllCursos';
import HojaDeVida from './HojaDeVida';

export default function Estudiante() {
  const { students, loading: loadingStudents } = useFetchStudents();
  const { cursos, loading: loadingCursos } = useAllCursos();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rut.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getCursoCodigo = (cursoId) => {
    const curso = cursos.find((curso) => curso.id === cursoId);
    return curso ? curso.codigo : 'No Asignado';
  };

  return (
    <div className="flex-grow overflow-y-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Sección Estudiantes</h1>

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

      {loadingStudents || loadingCursos ? (
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
                <th className="py-3 px-6 text-left">Hoja de Vida</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-100">
                  <td className="py-4 px-6">{student.name}</td>
                  <td className="py-4 px-6">{student.rut}</td>
                  <td className="py-4 px-6">{student.email}</td>
                  <td className="py-4 px-6">{getCursoCodigo(student.curso_id)}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleOpenModal(student)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Ver Hoja de Vida
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <HojaDeVida
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
