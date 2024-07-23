import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getAuthToken, setAuthToken } from '../../apiService';
import Nav from '../views/teacher/Nav';

export default function TeacherLayout() {

  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
        try {
            const token = getAuthToken();

            if (!token) {
                navigate('/teacher/authTeacher'); // Redirige a la página de inicio de sesión si no hay token
            } else {
                setAuthToken(token); // Establece el token en las cabeceras de Axios
                // Puedes realizar una verificación adicional del token con tu backend si es necesario
            }
        } catch (error) {
            console.error('Error al verificar la autenticación:', error);
        }
    };

    checkAuth(); // Llama a la función de verificación al cargar la página
  }, [navigate]);

  return (
    <>
    <Nav/>
    <Outlet/>
    </>
  )
}
