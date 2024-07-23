import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginCard({ role, description, bgColor, hoverBgColor, route }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold mb-4">Iniciar como {role}</h3>
        <p className="mb-6">{description}</p>
        <Link to={route} className={`${bgColor} text-white py-2 px-4 rounded ${hoverBgColor} transition-colors duration-300`}>
        Ingresar
        </Link>
    </div>
  )
}
