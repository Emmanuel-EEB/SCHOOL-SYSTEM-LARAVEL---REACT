import React, { useState } from 'react';
import apiClient from '../../../../apiService';
import SpinerLoading from '../../../reusable-components/SpinerLoading';
import DowloadExcel from '../../../reusable-components/DowloadExcel';
import * as XLSX from 'xlsx';

export default function CargaMasivaStudent() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setErrors('Por favor selecciona un archivo.');
      return;
    }
    
    setLoading(true);
    setErrors('');
    setSuccessMessage('');

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      try {
        const response = await apiClient.post('/admin/upload-students', { students: json });
        setSuccessMessage('Estudiantes cargados correctamente.');
        setFile(null);
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors(error.response.data.message);
        } else {
          setErrors('Error al cargar el archivo.');
        }
      } finally {
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
    <div className="p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Carga Masiva de Estudiantes</h1>
        {errors && <p className="text-red-500 mb-2 text-center">{errors}</p>}
        {successMessage && (
          <p className="text-green-500 mb-2 text-center font-bold text-xl">{successMessage}</p>
        )}
        <div className="mb-4">
          <input type="file" onChange={handleFileChange} className="border border-gray-300 rounded-md py-2 px-3 w-full" />
        </div>
        <button
          onClick={handleUpload}
          className="w-full bg-gray-900 text-white rounded-md py-2 hover:bg-gray-800 transition duration-300"
        >
          {loading ? <SpinerLoading /> : 'Cargar Estudiantes'}
        </button>
      </div>

      <DowloadExcel/>
    </div>

   
    </>
  );
}
