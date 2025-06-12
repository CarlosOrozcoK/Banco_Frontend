import React from "react";
import {
  ShieldCheckIcon,
  GiftIcon,
  ClockIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  UserGroupIcon,
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";

const HelpList = () => {
  const benefits = [
    {
      title: "Seguridad Avanzada",
      icon: <ShieldCheckIcon className="h-8 w-8 text-blue-600" />,
      description: "Protección contra fraudes con nuestro sistema de monitoreo 24/7",
      details: [
        "Alertas instantáneas de transacciones",
        "Seguro contra robos de identidad",
        "Cobertura en compras no autorizadas"
      ]
    },
    {
      title: "Beneficios Exclusivos",
      icon: <GiftIcon className="h-8 w-8 text-purple-600" />,
      description: "Descuentos y promociones solo para clientes",
      details: [
        "Hasta 40% de descuento en comercios aliados",
        "Acceso a eventos exclusivos",
        "Ofertas prioritarias en conciertos"
      ]
    },
    {
      title: "Atención Preferencial",
      icon: <ClockIcon className="h-8 w-8 text-green-600" />,
      description: "Canales exclusivos para clientes registrados",
      details: [
        "Línea directa sin esperas",
        "Gestores personales asignados",
        "Resolución de problemas en menos de 24h"
      ]
    },
    {
      title: "Recompensas",
      icon: <SparklesIcon className="h-8 w-8 text-yellow-500" />,
      description: "Programa de puntos redimibles",
      details: [
        "1 punto por cada $1 gastado",
        "Redime por millas aéreas",
        "Canje por productos exclusivos"
      ]
    },
    {
      title: "Tasas Preferenciales",
      icon: <CurrencyDollarIcon className="h-8 w-8 text-indigo-600" />,
      description: "Condiciones especiales en productos financieros",
      details: [
        "Hasta 1% menos en tasas de interés",
        "Plazos extendidos en créditos",
        "Sin comisiones por manejo de cuenta"
      ]
    },
    {
      title: "Tarjetas Premium",
      icon: <CreditCardIcon className="h-8 w-8 text-red-600" />,
      description: "Acceso a tarjetas con beneficios superiores",
      details: [
        "Seguro de viaje incluido",
        "Acceso a salas VIP en aeropuertos",
        "Asistencia médica internacional"
      ]
    }
  ];

  const additionalServices = [
    {
      title: "Banca Empresarial",
      icon: <UserGroupIcon className="h-8 w-8 text-cyan-600" />,
      features: [
        "Soluciones a medida para tu negocio",
        "Líneas de crédito especializadas",
        "Plataforma de pagos masivos"
      ]
    },
    {
      title: "App Móvil Plus",
      icon: <DevicePhoneMobileIcon className="h-8 w-8 text-orange-600" />,
      features: [
        "Firma digital para operaciones",
        "Inversiones con un clic",
        "Alertas personalizables"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Beneficios Exclusivos
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Descubre todo lo que puedes obtener por ser cliente de nuestro banco
        </p>
      </div>

      {/* Sección principal de beneficios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {benefits.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-opacity-20 mr-4" 
                     style={{ 
                      backgroundColor: item.icon.props.className.includes('text-') 
                          ? `${item.icon.props.className.match(/text-(.*?)-/)[1]}20` 
                          : '#f3f4f620' 
                     }}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <ul className="space-y-2 flex-grow">
                {item.details.map((detail, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors">
                Más información
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de servicios adicionales */}
      <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-100 opacity-40"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-indigo-100 opacity-40"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Servicios Premium
            </span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-opacity-20 mr-3" 
                       style={{ 
                        backgroundColor: service.icon.props.className.includes('text-') 
                            ? `${service.icon.props.className.match(/text-(.*?)-/)[1]}20` 
                            : '#f3f4f620' 
                       }}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 flex-shrink-0">
                        <ArrowRightIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                  Conocer más
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          <span className="border-b-4 border-blue-500 pb-2">Preguntas Frecuentes</span>
        </h2>
        <div className="space-y-4">
          {[
            {
              question: "¿Cómo accedo a los descuentos en comercios?",
              answer: "Presenta tu tarjeta en establecimientos aliados o activa las ofertas en nuestra app móvil."
            },
            {
              question: "¿Las recompensas tienen fecha de expiración?",
              answer: "Tus puntos acumulados expiran a los 24 meses de su obtención."
            },
            {
              question: "¿Cómo contacto a mi gestor personal?",
              answer: "Llama al *123 desde tu móvil o accede al chat exclusivo en nuestra banca en línea."
            }
          ].map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden transition-all hover:border-blue-300">
              <button className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-blue-50 transition-colors">
                <span className="font-medium text-gray-900">{item.question}</span>
                <ChevronDownIcon className="h-5 w-5 text-gray-500 transform transition-transform duration-300" />
              </button>
              <div className="p-4 bg-white border-t border-gray-100">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            Ver todas las preguntas
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpList;