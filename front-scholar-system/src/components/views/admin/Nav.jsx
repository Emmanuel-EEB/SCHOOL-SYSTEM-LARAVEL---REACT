import React, { useState } from 'react'
import apiClient, { setAuthToken } from '../../../apiService';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate para redireccionar
import SpinerLoading from '../../reusable-components/SpinerLoading';
export default function Nav() {

    const navigate = useNavigate();  // Obtiene la función de navegación
    const [loading, setLoading] = useState(false); // Inicializar en false ya que no estamos cargando al principio

    const handleLogout = async () => {
    setLoading(true); // Inicia el spinner de carga
    try {
        const response = await apiClient.post('/admin/logout');
        console.log(response.data.message);
        localStorage.removeItem('token'); // Elimina el token del localStorage
        setAuthToken(null); // Elimina el token JWT de las cabeceras
        navigate('/admin/authAdmin');  // Redirige al usuario al login después del cierre de sesión
    } catch (error) {
        console.error('Logout error:', error);
        // Manejar errores de cierre de sesión si es necesario
    }finally {
      setLoading(false); // Detiene el spinner de carga después de la solicitud
    }
    };

  return (
    <nav className='flex justify-between  items-center h-20 bg-gray-800 text-white shadow'>
      {loading && <SpinerLoading/>}
      <div className='px-4'>
        <h1 className='text-xl font-bold'>ScholarSys</h1>
      </div>
      
      <div className='mr-2'>
        <button
          className='bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-xl'
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  )
}
