import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from '../../reusable-components/ArrowIcon'; // Asegúrate de ajustar la ruta correcta


export default function Sidebar() {

  const [showOptions, setShowOptions] = useState({
    estudiante: false,
    docente: false,
    curso: false,
    asignatura: false,
  });

  const toggleOptions = (section) => {
    setShowOptions((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className='bg-gray-900 text-white md:w-80'>
      <div className='p-4'>
        
        <div className='flex justify-center mb-4'>
          <p className='text-lg font-bold'>Administrador</p>
        </div>
        
        <ul>
          <li className='py-2'>
            <Link to="/admin/inicio" className='flex items-center text-gray-300 hover:text-white'>
              Inicio
            </Link>
          </li>
          
          <li className='py-2'>
            <div className='flex justify-between items-center cursor-pointer text-gray-300 hover:text-white' onClick={() => toggleOptions('estudiante')}>
              <span>Estudiantes</span>
              <ArrowIcon className='h-5 w-5' color='currentColor' rotated={showOptions.estudiante} />
            </div>
           
            {showOptions.estudiante && (
              <ul className='pl-3 pt-2'>
                <li className='p-1'>
                  <Link to="/admin/estudiante" className='text-gray-300 hover:text-white'>Todos los Estudiantes</Link>
                </li>
                <li className='p-1'>
                  <Link to="/admin/addestudiante" className='text-gray-300 hover:text-white'>Agregar Estudiante</Link>
                </li>
              </ul>
            )} 
          </li>
          
          <li className='py-2'>
            <div className='flex justify-between items-center cursor-pointer text-gray-300 hover:text-white' onClick={() => toggleOptions('docente')}>
              <span>Docentes</span>
              <ArrowIcon className='h-5 w-5' color='currentColor' rotated={showOptions.docente} />
            </div>
            {showOptions.docente && (
              <ul className='pl-3 pt-2'>
                <li className='p-1'>
                  <Link to="/admin/docente" className='text-gray-300 hover:text-white'>Tododos los Docentes</Link>
                </li>
                <li className='p-1'>
                  <Link to="/admin/addDocente" className='text-gray-300 hover:text-white'>Agregar Docente</Link>
                </li>
                <li className='p-1'>
                  <Link to="/admin/agregar-asignatura-docente" className='text-gray-300 hover:text-white'>Agregar Asignaturas a un Docente</Link>
                </li>
                {/* Otros CRUD operations para docentes */}
              </ul>
            )}
          </li>
          <li className='py-2'>
            <div className='flex justify-between items-center cursor-pointer text-gray-300 hover:text-white' onClick={() => toggleOptions('curso')}>
              <span>Cursos</span>
              <ArrowIcon className='h-5 w-5' color='currentColor' rotated={showOptions.curso} />
            </div>
            {showOptions.curso && (
              <ul className='pl-3 pt-2'>
                <li className='p-1'>
                  <Link to="/admin/curso" className='text-gray-300 hover:text-white'>Todos los cursos</Link>
                </li>
                <li className='p-1'>
                  <Link to="/admin/addCurso" className='text-gray-300 hover:text-white'>Agregar Curso</Link>
                </li>
                <li className='p-1'>
                  <Link to="/admin/agregar-st-cur" className='text-gray-300 hover:text-white'>Agregar estudiantes a un Curso</Link>
                </li>
                {/* Otros CRUD operations para cursos */}
              </ul>
            )}
          </li>
          <li className='py-2'>
            <div className='flex justify-between items-center cursor-pointer text-gray-300 hover:text-white' onClick={() => toggleOptions('asignatura')}>
              <span>Asignaturas</span>
              <ArrowIcon className='h-5 w-5' color='currentColor' rotated={showOptions.asignatura} />
            </div>
            {showOptions.asignatura && (
              <ul className='pl-3 pt-2'>
                <li className='p-1'>
                  <Link to="/admin/asignatura" className='text-gray-300 hover:text-white'>Todas las Asignaturas</Link>
                </li>
                <li className='p-1'>
                  <Link to="/admin/addAsignatura" className='text-gray-300 hover:text-white'>Agregar Asignatura</Link>
                </li>
                <li className='p-1'>
                  <Link to="/admin/agregar-asg-cur" className='text-gray-300 hover:text-white'>Agregar asignaturas a un Curso</Link>
                </li>
                {/* Otros CRUD operations para asignaturas */}
              </ul>
            )}
          </li>
          <li className='py-2'>
            <div className='flex justify-between items-center cursor-pointer text-gray-300 hover:text-white' onClick={() => toggleOptions('configuraciones')}>
              <span>Carga Masiva</span>
              <ArrowIcon className='h-5 w-5' color='currentColor' rotated={showOptions.configuraciones} />
            </div>
            {showOptions.configuraciones && (
              <ul className='pl-3 pt-2'>
                <li className='p-1'>
                  <Link to="/admin/carga-msv-st" className='text-gray-300 hover:text-white'>Carga Masiva de Estudiantes</Link>
                </li>
              </ul>
            )}
          </li>
          
        </ul>
      </div>
    </div>
  );
}
