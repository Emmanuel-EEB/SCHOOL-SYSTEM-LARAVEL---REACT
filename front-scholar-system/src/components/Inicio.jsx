import React from 'react';
import LoginCard from './reusable-components/LoginCard';



export default function Inicio() {
  return (
    <div className="min-h-screen bg-gray-100 mb-10">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">ScholarSync</h1>
          <ul className="flex space-x-4 text-white">
            <li><a href="#" className="hover:text-gray-200">Contacto</a></li>
            <li><a href="#" className="hover:text-gray-200">Inicio</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Bienvenidos a ScholarSync</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <LoginCard 
            role="Estudiante"
            description="Accede a tus cursos, tareas y recursos."
            bgColor="bg-blue-600"
            hoverBgColor="hover:bg-blue-700"
            route="/student/authStudent"

          />
          <LoginCard 
            role="Docente"
            description="Gestiona tus clases, asignaturas y estudiantes."
            bgColor="bg-green-600"
            hoverBgColor="hover:bg-green-700"
            route="/teacher/authTeacher"
          />
          <LoginCard 
            role="Administrador"
            description="Administra el sistema escolar y supervisa todo."
            bgColor="bg-red-600"
            hoverBgColor="hover:bg-red-700"
            route="/admin/authAdmin"
          />
        </div>
      </div>
    </div>
  );
}
