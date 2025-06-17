import React from 'react';
import {
  ShieldCheckIcon,
  CheckCircleIcon,
  HomeIcon,     // Añadir esta importación
  TruckIcon,    // Añadir esta importación
  HeartIcon,    // Añadir esta importación
  PhoneIcon,    // Añadir esta importación
  ArrowRightIcon // Añadir esta importación para el botón "Ver detalles"
} from '@heroicons/react/24/outline';

// Nota: 'MedicalIcon' no existe en @heroicons/react/24/outline.
// Si necesitas un icono relacionado con la medicina, podrías usar 'PlusCircleIcon', 'StarIcon' o buscar una alternativa.
// Por ahora, lo he eliminado para evitar errores, o puedes reemplazarlo con otro icono disponible.
// Por ejemplo, para salud, podrías usar una 'HeartIcon' o similar si te parece adecuado.
// Para este ejemplo, he asumido que puedes usar HeartIcon o un icono genérico.
// Si tienes un icono personalizado para MedicalIcon, asegúrate de importarlo desde su ubicación correcta.

const InsuranceView = () => {
  const insuranceData = {
    title: "Seguros",
    description: "Protege lo que más te importa",
    features: [
      "Cobertura personalizada",
      "Asistencia 24/7",
      "Proceso de reclamos ágil",
      "Red de proveedores a nivel nacional"
    ],
    insuranceTypes: [
      {
        name: "Hogar",
        coverage: "Incendio, robo, daños",
        icon: <HomeIcon className="h-6 w-6 text-red-500" />
      },
      {
        name: "Vehículo",
        coverage: "Colisión, responsabilidad civil",
        icon: <TruckIcon className="h-6 w-6 text-blue-500" />
      },
      {
        name: "Vida",
        coverage: "Protección familiar",
        icon: <HeartIcon className="h-6 w-6 text-pink-500" />
      },
      {
        name: "Salud",
        coverage: "Hospitalización, medicinas",
        // Usaremos HeartIcon como placeholder o podrías importar tu propio icono
        icon: <HeartIcon className="h-6 w-6 text-green-500" />
      }
    ],
    requirements: [
      "Documento de identificación",
      "Formulario de solicitud",
      "Inspección (para seguros de propiedad)"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <ShieldCheckIcon className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-3">
            {insuranceData.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {insuranceData.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Hero Image */}
          <div
            className="h-48 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80)" }}
          >
            <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
              <h2 className="text-2xl font-bold text-white">Tranquilidad para tu futuro</h2>
            </div>
          </div>

          {/* Insurance Types */}
          <div className="p-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tipos de cobertura</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insuranceData.insuranceTypes.map((type, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <div className="p-2 rounded-full bg-opacity-20 mr-3" style={{
                        backgroundColor: type.icon.props.className.includes('red') ? 'rgba(239, 68, 68, 0.2)' :
                          type.icon.props.className.includes('blue') ? 'rgba(59, 130, 246, 0.2)' :
                            type.icon.props.className.includes('pink') ? 'rgba(236, 72, 153, 0.2)' : 'rgba(16, 185, 129, 0.2)'
                      }}>
                        {type.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{type.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-2"><span className="font-medium">Cobertura:</span> {type.coverage}</p>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium mt-2 flex items-center">
                      Ver detalles <ArrowRightIcon className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-100 rounded-lg p-6 mb-10">
              <h3 className="text-lg font-bold text-red-800 mb-3">Asistencia en emergencias</h3>
              <p className="text-red-700 mb-4">Llama a nuestro centro de atención 24/7 en caso de siniestro</p>
              <div className="flex items-center">
                <PhoneIcon className="h-6 w-6 text-red-600 mr-2" />
                <span className="text-xl font-bold">5555-6789</span>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Necesitas asesoría?</h3>
              <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition duration-300">
                Cotizar seguro
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceView;