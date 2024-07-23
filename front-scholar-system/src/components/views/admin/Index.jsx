import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';  // Importa useNavigate para redireccionar
import apiClient, { getAuthToken, setAuthToken } from '../../../apiService';


export default function Index() {

  const navigate = useNavigate();  // Obtiene la función de navegación
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getAuthToken();

        if (!token) {
          navigate('/admin/authAdmin'); // Redirige al login si no hay token
        }
      } catch (error) {
        console.error('Error al verificar la autenticación:', error);
      }
    };
    checkAuth();
  }, [navigate]);

   // Si está autenticado, muestra el contenido de la página protegida
   return (
    <>
    <Outlet/>
    </>
   );
 }