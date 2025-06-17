import React from 'react';
import { ArrowTrendingUpIcon, CheckCircleIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const StocksView = () => {
  const stocksData = {
    title: "Inversión en Acciones",
    description: "Invierte en las principales empresas del mercado nacional e internacional.",
    benefits: [
      "Potencial de alto retorno",
      "Diversificación de portafolio",
      "Acceso a mercados globales",
      "Control sobre tus inversiones"
    ],
    investmentOptions: [
      { name: "Acciones Nacionales", details: "Empresas líderes del país", minInvestment: "Q 1,000" },
      { name: "Acciones Internacionales", details: "Empresas de EE. UU. y Europa", minInvestment: "Q 5,000" },
      { name: "ETFs (Fondos Cotizados)", details: "Cestas de acciones diversificadas", minInvestment: "Q 500" }
    ],
    howToInvest: [
      "Abre tu cuenta de inversión",
      "Realiza un depósito inicial",
      "Selecciona las acciones de tu interés",
      "Monitorea y gestiona tu portafolio"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
            <ArrowTrendingUpIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-3">
            {stocksData.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {stocksData.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Hero Image */}
          <div
            className="h-48 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)" }}
          >
            <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
              <h2 className="text-2xl font-bold text-white">Tu puerta al mercado de valores</h2>
            </div>
          </div>

          <div className="p-8">
            {/* Benefits Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Beneficios de invertir en acciones</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stocksData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Options */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Opciones de inversión</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stocksData.investmentOptions.map((option, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                    <ChartBarIcon className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h3>
                    <p className="text-gray-600 mb-3">{option.details}</p>
                    <p className="text-lg font-semibold text-blue-700">Mínimo: {option.minInvestment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Invest Section */}
            <div className="mb-10 bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cómo empezar a invertir?</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {stocksData.howToInvest.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">¡Empieza a construir tu futuro financiero!</h3>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-300">
                Abrir cuenta de inversión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StocksView;