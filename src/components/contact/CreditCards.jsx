import React from 'react';
import { CreditCardIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const CreditCardsView = () => {
  const cardData = {
    title: "Tarjetas de Crédito",
    description: "Elige la que mejor se adapte a tu estilo de vida",
    features: [
      "Millas de viaje",
      "Cashback en compras",
      "Seguros incluidos",
      "Sin anualidad el primer año"
    ],
    types: [
      { name: "Clásica", creditLimit: "Hasta Q15,000" },
      { name: "Oro", creditLimit: "Hasta Q35,000", benefits: ["Acceso a salas VIP"] },
      { name: "Platino", creditLimit: "Hasta Q75,000", benefits: ["Asistencia premium"] }
    ],
    requirements: [
      "Ingresos mínimos: Q5,000/mes",
      "Historial crediticio positivo",
      "Documento de identificación vigente"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-4">
            <CreditCardIcon className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-3">
            {cardData.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {cardData.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Hero Image */}
          <div 
            className="h-48 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url(https://d25hb9r8pbsv4w.cloudfront.net/blog/wp-content/uploads/2019/10/04154421/Requisitos-para-solicitar-tarjeta-de-credito-1.jpg)" }}
          >
            <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
              <h2 className="text-2xl font-bold text-white">Descubre el poder de tu tarjeta</h2>
            </div>
          </div>

          {/* Features Section */}
          <div className="p-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Beneficios</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cardData.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Types */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tipos de tarjetas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cardData.types.map((type, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-lg text-purple-700 mb-2">{type.name}</h3>
                    <p className="text-gray-600 mb-2">Límite: {type.creditLimit}</p>
                    {type.benefits && (
                      <ul className="text-sm text-gray-500">
                        {type.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start mt-1">
                            <svg className="h-4 w-4 text-purple-300 mr-1 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Listo para solicitar tu tarjeta?</h3>
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition duration-300">
                Solicitar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardsView;