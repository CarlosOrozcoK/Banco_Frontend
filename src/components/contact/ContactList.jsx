import { useState } from 'react';

const ContactList = () => {
  // Datos iniciales de ejemplo
  const initialContacts = [
    { 
      id: 1, 
      name: 'Joaquin Gonzalez', 
      email: 'atencion.clientes@banguat.gob.gt', 
      phone: '2422-1333', 
      department: 'Atención al Público', 
      position: 'Jefe de Servicio',
      extension: '101',
      schedule: 'Lunes a Viernes 8:00 - 16:00'
    },
    { 
      id: 2, 
      name: 'Carlos Orozco', 
      email: 'consultas.financieras@banguat.gob.gt', 
      phone: '2422-1444', 
      department: 'Asesoría Financiera', 
      position: 'Asesora Senior',
      extension: '205',
      schedule: 'Lunes a Viernes 9:00 - 15:00'
    },
    { 
      id: 3, 
      name: 'Luis Perez', 
      email: 'informacion.monetaria@banguat.gob.gt', 
      phone: '2422-1555', 
      department: 'Estadísticas Monetarias', 
      position: 'Coordinador',
      extension: '310',
      schedule: 'Lunes a Viernes 8:30 - 16:30'
    },
  ];

  const [contacts, setContacts] = useState(initialContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  // Filtrar contactos
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado institucional */}
        <div className="bg-blue-900 text-white p-6 rounded-t-lg shadow-md">
          <div className="flex items-center">
            <img 
              src="./src/assets/Logo Banco Nacional de Guatemala.png" 
              alt="Logo Banco de Guatemala" 
              className="h-16 mr-4"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Banco de Guatemala</h1>
              <p className="mt-1 text-sm md:text-base">Directorio de Servicios al Público</p>
            </div>
          </div>
        </div>
        
        {/* Información importante */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Información importante</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  • Horario de atención: Lunes a viernes de 8:00 a 16:00 horas<br />
                  • Teléfono general: (502) 2422-1333<br />
                  • Dirección: 7a. Avenida 22-01, Zona 1, Ciudad de Guatemala<br />
                  • Para emergencias fuera de horario contacte al: 2422-1000
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Panel de búsqueda */}
        <div className="bg-white p-6 shadow-md">
          <div className="w-full">
            <input
              type="text"
              placeholder="Buscar por nombre, departamento o teléfono..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Tabla de contactos */}
        <div className="bg-white shadow-md rounded-b-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Departamento</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Responsable</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Contacto</th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">Horario</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <tr 
                    key={contact.id} 
                    className="hover:bg-blue-50 cursor-pointer"
                    onClick={() => {
                      setCurrentContact(contact);
                      setIsModalOpen(true);
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{contact.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{contact.name}</div>
                      <div className="text-sm text-gray-500">{contact.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{contact.phone}</div>
                      <div className="text-sm text-blue-600">{contact.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {contact.schedule}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No se encontraron resultados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Servicios adicionales */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Servicios en Línea</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Consulta de tasas de interés</li>
              <li>• Estadísticas económicas</li>
              <li>• Publicaciones oficiales</li>
              <li>• Regulaciones financieras</li>
            </ul>
            <a 
              href="https://www.banguat.gob.gt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Visitar portal web →
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Atención al Ciudadano</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Quejas y sugerencias</li>
              <li>• Acceso a información pública</li>
              <li>• Protección al consumidor</li>
              <li>• Educación financiera</li>
            </ul>
            <div className="mt-4 text-sm text-gray-700">
              <p>Email: <span className="text-blue-600">servicio.ciudadano@banguat.gob.gt</span></p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-600">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Emergencias</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Denuncias financieras: 2422-1000</li>
              <li>• Asistencia legal: 2422-1222</li>
              <li>• Situaciones de riesgo: 2422-1999</li>
              <li>• 24 horas / 7 días</li>
            </ul>
            <div className="mt-4 text-xs text-gray-500">
              <p>Para uso exclusivo en situaciones que requieran intervención inmediata</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalle de contacto */}
      {isModalOpen && currentContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="bg-blue-900 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-bold">{currentContact.department}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start mb-6">
                <div className="bg-blue-100 text-blue-800 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{currentContact.name}</h3>
                  <p className="text-gray-600">{currentContact.position}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Contacto directo</h4>
                  <p className="text-gray-800">{currentContact.phone} Ext. {currentContact.extension}</p>
                  <p className="text-blue-600">{currentContact.email}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Horario de atención</h4>
                  <p className="text-gray-800">{currentContact.schedule}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Servicios que ofrece</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {currentContact.department === 'Atención al Público' && (
                      <>
                        <li>Información general</li>
                        <li>Recepción de documentos</li>
                        <li>Orientación a usuarios</li>
                      </>
                    )}
                    {currentContact.department === 'Asesoría Financiera' && (
                      <>
                        <li>Consultas especializadas</li>
                        <li>Análisis de casos</li>
                        <li>Asesoramiento regulatorio</li>
                      </>
                    )}
                    {currentContact.department === 'Estadísticas Monetarias' && (
                      <>
                        <li>Reportes económicos</li>
                        <li>Datos históricos</li>
                        <li>Indicadores financieros</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <strong>Nota:</strong> Para requerimientos fuera del horario establecido, 
                  favor contactar al departamento de guardia al 2422-1000.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;