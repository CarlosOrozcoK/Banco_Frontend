import React from 'react';
import { WalletIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline'; // Añadir ArrowRightIcon

const LoansView = () => {
  const loanData = {
    title: "Préstamos Personales",
    description: "Financia tus proyectos con las mejores tasas",
    features: [
      "Aprobación en 24 horas",
      "Tasas desde 8% anual",
      "Plazos de 12 a 60 meses",
      "Sin garantías requeridas"
    ],
    loanTypes: [
      { name: "Express", amount: "Hasta Q25,000", term: "12-24 meses" },
      { name: "Estándar", amount: "Hasta Q100,000", term: "12-48 meses" },
      { name: "Premium", amount: "Hasta Q250,000", term: "12-60 meses" }
    ],
    requirements: [
      "Ingresos comprobables",
      "Edad entre 21-65 años",
      "Antigüedad laboral mínima: 6 meses"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <WalletIcon className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-3">
            {loanData.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {loanData.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Hero Image */}
          <div
            className="h-48 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80)" }}
          >
            <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
              <h2 className="text-2xl font-bold text-white">Hacemos realidad tus proyectos</h2>
            </div>
          </div>

          {/* Features Section */}
          <div className="p-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ventajas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loanData.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Loan Calculator */}
            <div className="mb-10 bg-green-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Simulador de préstamo</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monto (Q)</label>
                  <input type="range" min="5000" max="250000" step="5000" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plazo (meses)</label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>12</option>
                    <option>24</option>
                    <option>36</option>
                    <option>48</option>
                    <option>60</option>
                  </select>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-sm text-gray-500">Cuota estimada</p>
                  <p className="text-xl font-bold text-green-600">Q1,850/mes</p>
                </div>
              </div>
              <button className="text-green-600 hover:text-green-800 font-medium flex items-center">
                Ver tabla de amortización <ArrowRightIcon className="h-4 w-4 ml-1" />
              </button>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Necesitas financiamiento?</h3>
              <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition duration-300">
                Solicitar préstamo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoansView;