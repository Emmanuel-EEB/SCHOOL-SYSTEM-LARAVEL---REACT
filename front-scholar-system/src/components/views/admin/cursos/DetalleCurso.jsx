import React, { useState, useEffect } from 'react';
import apiClient from '../../../../apiService';
import { useParams } from 'react-router-dom';

export default function DetalleCurso() {
  const { id } = useParams(); // Obtener el parámetro de la URL

  const [curso, setCurso] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/admin/curso/${searchId}`);
      setCurso(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error al buscar el curso:', error);
      setError('No se encontró ningún curso con ese código.');
      setLoading(false);
    }
  };

  const handleIdChange = (event) => {
    setSearchId(event.target.value);
  };

  useEffect(() => {
    if (id) {
      setSearchId(id);
    }
  }, [id]);

  return (
    <div className="flex-grow overflow-y-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Detalles del Curso</h1>

      <div className="mb-4">
        <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
          Código del Curso
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="codigo"
            name="codigo"
            value={searchId}
            onChange={handleIdChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            placeholder="Ingrese el código del curso"
          />
        </div>
      </div>

      <button
        type="button"
        className="bg-gray-800 text-white rounded-md px-4 py-2"
        onClick={handleSearch}
        disabled={loading}
      >
        Buscar Curso
      </button>

      {loading && <p className="mt-2">Buscando curso...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      {curso && (
        <div className="mt-4 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">{curso.codigo}</h2>
          <p className="text-gray-600 mb-2">{curso.nombre}</p>
          {/* Aquí puedes mostrar más detalles del curso según tu modelo de datos */}
        </div>
      )}
    </div>
  );
}
