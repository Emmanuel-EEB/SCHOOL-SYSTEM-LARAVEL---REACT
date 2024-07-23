import React, { useState } from 'react';
import apiClient, { setAuthToken } from '../../apiService';
import { Link, useNavigate } from 'react-router-dom';
import SpinerLoading from '../reusable-components/SpinerLoading';

export default function AuthAdmin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Inicializar en false ya que no estamos cargando al principio

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Inicia el spinner de carga

    try {
      const response = await apiClient.post('/admin/login', { email, password });
      const { access_token } = response.data;
      setAuthToken(access_token);
      console.log('Login successful');
      navigate('/admin/index');
    } catch (error) {
      setError('Error al Iniciar. Por favor verifica tus credenciales');
      console.error('Login error:', error);
    } finally {
      setLoading(false); // Detiene el spinner de carga después de la solicitud
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        {loading && <SpinerLoading/>}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Administrador - Iniciar Sesión</h2>
          <form onSubmit={handleAdminLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tú Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading} // Deshabilitar input cuando se esté cargando
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Contraseña</label>
              <input 
                type="password" 
                id="password" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tú Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading} // Deshabilitar input cuando se esté cargando
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm mb-4">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              disabled={loading} // Deshabilitar botón cuando se esté cargando
            >
            Iniciar Sesión
            </button>
          </form>
        </div>  
        <div className='text-center pt-5 text-cyan-500'>
        <Link to="/">Volver al Inicio</Link>
        </div>
      </div>
    </>
  );
}
