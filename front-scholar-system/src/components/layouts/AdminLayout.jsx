import React, { useEffect } from 'react'
import Nav from '../views/admin/Nav'
import Sidebar from '../views/admin/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { getAuthToken, setAuthToken } from '../../apiService';
export default function AdminLayout() {

  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
        try {
            const token = getAuthToken();

            if (!token) {
                navigate('/admin/authAdmin'); // Redirige a la página de inicio de sesión si no hay token
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
    <div className="md:flex md:min-h-screen">
      <div className="md:flex flex-col flex-grow">
        <Nav/>
        <div className="md:flex flex-grow">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </div>
    </>
  )
}
