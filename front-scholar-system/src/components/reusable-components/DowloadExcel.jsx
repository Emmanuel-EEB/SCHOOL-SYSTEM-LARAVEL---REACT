import React from 'react';
import * as XLSX from 'xlsx';

const studentData = [
  { name: 'Estudents N°1', rut: '12345678-9', email: 'email@example.com' },
];

export default function DownloadStudentTemplate() {
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(studentData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estudiantes');
    XLSX.writeFile(workbook, 'PlantillaEstudiantes.xlsx');
  };

  return (
    <div className="p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Descargar Plantilla de Estudiantes</h1>
        <button
          onClick={handleDownload}
          className="w-full bg-gray-900 text-white rounded-md py-2 hover:bg-gray-800 transition duration-300"
        >
          Descargar Plantilla
        </button>
      </div>
    </div>
  );
}
