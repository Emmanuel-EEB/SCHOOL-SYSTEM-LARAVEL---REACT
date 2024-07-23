import React from 'react';

export default function HojaDeVida({ student, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-75 flex">
      <div className="relative p-8 bg-white w-full max-w-4xl m-auto flex-col flex rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Hoja de Vida del Estudiante</h2>
        <form className="space-y-6">
          {/* Información Personal */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Información Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="block text-gray-700">Nombre Completo</label>
                <input
                  type="text"
                  value={student.name}
                  readOnly
                  className="form-input bg-gray-100"
                />
              </div>
              <div className="form-group">
                <label className="block text-gray-700">Número de Identificación (RUT)</label>
                <input
                  type="text"
                  value={student.rut}
                  readOnly
                  className="form-input bg-gray-100"
                />
              </div>
              <div className="form-group">
                <label className="block text-gray-700">Fecha de Nacimiento</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group">
                <label className="block text-gray-700">Edad</label>
                <input type="number" className="form-input" />
              </div>
              <div className="form-group">
                <label className="block text-gray-700">Género</label>
                <input type="text" className="form-input" />
              </div>
              <div className="form-group">
                <label className="block text-gray-700">Dirección</label>
                <input type="text" className="form-input" />
              </div>
              <div className="form-group">
                <label className="block text-gray-700">Teléfono de Contacto</label>
                <input type="tel" className="form-input" />
              </div>
              <div className="form-group">
                <label className="block text-gray-700">Correo Electrónico</label>
                <input
                  type="email"
                  value={student.email}
                  readOnly
                  className="form-input bg-gray-100"
                />
              </div>
              <div className="form-group">
                <label className="block text-gray-700">Fotografía</label>
                <input type="file" className="form-input" />
              </div>
            </div>
          </div>

          

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
