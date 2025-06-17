import React from 'react';
import { CurrencyDollarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export const ProductsListT = () => {
  const accountData = {
    title: "Cuenta Corriente",
    description: "Cuenta con beneficios exclusivos y sin costos de mantenimiento",
    features: [
      "Sin comisiones",
      "Tarjeta débito incluida",
      "App móvil"
    ],
    benefits: [
      "Acceso a banca en línea 24/7",
      "Transferencias sin costo",
      "Pago de servicios básicos",
      "Retiros en cajeros a nivel nacional"
    ],
    requirements: [
      "Documento de identificación vigente",
      "Comprobante de ingresos",
      "Monto mínimo de apertura: Q100.00"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
            <CurrencyDollarIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-3">
            {accountData.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {accountData.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Hero Image */}
          <div className="h-48 bg-blue-600 flex items-center justify-center">
            <div className="text-white text-center p-6">
              <h2 className="text-2xl font-bold mb-2">Abre tu cuenta hoy mismo</h2>
              <p className="text-blue-100">Disfruta de todos los beneficios que tenemos para ti</p>
            </div>
          </div>

          {/* Features Section */}
          <div className="p-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Características principales</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {accountData.features.map((feature, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900">{feature}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Beneficios exclusivos</h2>
              <ul className="space-y-4">
                {accountData.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-5 w-5 text-green-500">
                        <CheckCircleIcon className="h-full w-full" />
                      </div>
                    </div>
                    <p className="ml-3 text-lg text-gray-700">{benefit}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Requisitos para apertura</h2>
              <ul className="space-y-3">
                {accountData.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-5 w-5 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-gray-700">{requirement}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Listo para abrir tu cuenta?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Empieza a disfrutar de todos los beneficios de tu cuenta corriente hoy mismo.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-300">
                  Abrir cuenta en línea
                </button>
                <button className="px-6 py-3 bg-white hover:bg-gray-50 text-blue-600 font-medium rounded-lg border border-blue-200 shadow-sm transition duration-300">
                  Visitar sucursal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Preguntas frecuentes</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">¿Hay algún costo de mantenimiento?</h3>
              <p className="mt-2 text-gray-600">No, nuestra cuenta corriente no tiene costos de mantenimiento mensuales.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">¿Cuál es el saldo mínimo requerido?</h3>
              <p className="mt-2 text-gray-600">El saldo mínimo para evitar cargos es de Q100.00.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">¿Puedo acceder a banca en línea?</h3>
              <p className="mt-2 text-gray-600">Sí, tendrás acceso completo a nuestra plataforma de banca en línea y aplicación móvil.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsListT;