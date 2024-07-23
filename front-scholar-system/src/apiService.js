// apiService.js
import axios from 'axios';

const apiClient = axios.create({
    //baseURL: 'http://localhost:8000/api', // Reemplaza con la URL de tu API Laravel
    baseURL: 'http://192.168.0.112:8000/api', // Reemplaza con la URL de tu API Laravel
    headers: {
        'Content-Type': 'application/json',
    },
});

// Función para establecer el token JWT en las cabeceras de Axios y localStorage
export function setAuthToken(token) {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token); // Almacena el token en localStorage
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
        localStorage.removeItem('token'); // Elimina el token del localStorage
    }
}

// Función para obtener el token JWT almacenado en localStorage
export function getAuthToken() {
    return localStorage.getItem('token');
}


export default apiClient;