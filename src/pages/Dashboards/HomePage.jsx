// HomePage.jsx
import React from "react";
import {
  HomeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  EnvelopeIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  SparklesIcon,
  GiftIcon,
  ClockIcon,
  CheckCircleIcon,
  BuildingLibraryIcon,
  DocumentTextIcon,
  PhoneIcon,
  UserGroupIcon,
  BellIcon,
  UserCircleIcon,
  ArrowTrendingUpIcon,
  WalletIcon,
  BuildingOfficeIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  LockClosedIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
  HeartIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Cuenta Corriente",
    description: "Cuenta con beneficios exclusivos y sin costos de mantenimiento",
    icon: <CurrencyDollarIcon className="h-8 w-8 text-blue-600" />,
    image: "https://images.adsttc.com/media/images/5b88/452c/f197/cc41/9300/00b2/large_jpg/-_Featured_Image.jpg?1535657248",
    features: ["Sin comisiones", "Tarjeta débito incluida", "App móvil"],
    route: "/NProducts/cuenta-corriente", // Ruta específica para Cuenta Corriente
  },
  {
    id: 2,
    title: "Tarjetas de Crédito",
    description: "Elige la que mejor se adapte a tu estilo de vida",
    icon: <CreditCardIcon className="h-8 w-8 text-purple-600" />,
    image: "https://d25hb9r8pbsv4w.cloudfront.net/blog/wp-content/uploads/2019/10/04154421/Requisitos-para-solicitar-tarjeta-de-credito-1.jpg",
    features: ["Millas de viaje", "Cashback", "Seguros incluidos"],
    route: "/products/credit-cards", // Ruta específica para Tarjetas de Crédito
  },
  {
    id: 3,
    title: "Préstamos Personales",
    description: "Financia tus proyectos con las mejores tasas",
    icon: <WalletIcon className="h-8 w-8 text-green-600" />,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    features: ["Aprobación rápida", "Tasas competitivas", "Plazos flexibles"],
    route: "/products/loans", // Ruta específica para Préstamos Personales
  },
  {
    id: 4,
    title: "Seguros",
    description: "Protege lo que más te importa",
    icon: <ShieldCheckIcon className="h-8 w-8 text-red-600" />,
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    features: ["Hogar", "Vehículo", "Vida", "Salud"],
    route: "/products/insurance", // Ruta específica para Seguros
  }
];

const investments = [
  {
    id: 1,
    title: "Fondos Mutuos",
    description: "Inversión diversificada con retornos competitivos",
    icon: <ChartBarIcon className="h-8 w-8 text-green-600" />,
    image: "https://images.unsplash.com/photo-1468254095679-bbcba94a7066?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    roi: "6-12% anual",
    route: "/products/mutual-funds" // Ejemplo de ruta para Fondos Mutuos
  },
  {
    id: 2,
    title: "Depósitos a Plazo",
    description: "Tasas fijas para tu seguridad financiera",
    icon: <BuildingLibraryIcon className="h-8 w-8 text-yellow-600" />,
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    roi: "4-8% anual",
    route: "/products/time-deposits" // Ejemplo de ruta para Depósitos a Plazo
  },
  {
    id: 3,
    title: "Acciones",
    description: "Invierte en las principales empresas del mercado",
    icon: <ArrowTrendingUpIcon className="h-8 w-8 text-blue-600" />,
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    roi: "Variable según mercado",
    route: "/products/stocks" // ¡Aquí está la ruta para Acciones!
  },
  {
    id: 4,
    title: "Bienes Raíces",
    description: "Inversión inmobiliaria con rentabilidad a largo plazo",
    icon: <BuildingOfficeIcon className="h-8 w-8 text-purple-600" />,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    roi: "8-15% anual",
    route: "/products/real-estate" // Ejemplo de ruta para Bienes Raíces
  }
];

const helpTopics = [
  {
    id: 1,
    title: "Preguntas Frecuentes",
    description: "Encuentra respuestas a las consultas más comunes",
    icon: <DocumentTextIcon className="h-8 w-8 text-blue-500" />,
    link: "/faq"
  },
  {
    id: 2,
    title: "Tutoriales",
    description: "Aprende a usar nuestra plataforma paso a paso",
    icon: <QuestionMarkCircleIcon className="h-8 w-8 text-purple-500" />,
    link: "alvaro" // Asegúrate de que esta ruta sea correcta o cámbiala.
  },
  {
    id: 3,
    title: "Seguridad",
    description: "Consejos para proteger tus finanzas",
    icon: <LockClosedIcon className="h-8 w-8 text-green-500" />,
    link: "/security"
  },
  {
    id: 4,
    title: "Términos y Condiciones",
    description: "Conoce nuestros términos de servicio",
    icon: <DocumentTextIcon className="h-8 w-8 text-orange-500" />,
    link: "/terms"
  }
];

const contactMethods = [
  {
    id: 1,
    title: "Atención Telefónica",
    description: "24/7 para asistencia inmediata",
    icon: <PhoneIcon className="h-8 w-8 text-green-500" />,
    details: "800 123 4567"
  },
  {
    id: 2,
    title: "Sucursales",
    description: "Encuentra nuestra red de oficinas",
    icon: <UserGroupIcon className="h-8 w-8 text-orange-500" />,
    details: "200+ ubicaciones"
  },
  {
    id: 3,
    title: "App Móvil",
    description: "Descarga nuestra aplicación",
    icon: <DevicePhoneMobileIcon className="h-8 w-8 text-blue-500" />,
    details: "Disponible en iOS y Android"
  },
  {
    id: 4,
    title: "Redes Sociales",
    description: "Síguenos en nuestras redes",
    icon: <GlobeAltIcon className="h-8 w-8 text-purple-500" />,
    details: "@Banco de Guatemala"
  }
];

export default function FullPageBank() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user] = React.useState({});

  const [activeSection, setActiveSection] = React.useState("inicio");

  const carouselItems = [
    {
      id: 1,
      image: "https://www.criptonoticias.com/wp-content/uploads/2017/11/Bank-Ayudhya-krungsri-blockchain.jpeg",
      title: "Promoción Especial",
      description: "Obtén un 1% adicional en tus inversiones este mes"
    },
    {
      id: 2,
      image: "https://wallpapers.com/images/hd/american-express-black-card-edition-ztp35b177avvafmr.jpg",
      title: "Nueva Tarjeta Platino",
      description: "Beneficios exclusivos para clientes preferenciales"
    },
    {
      id: 3,
      image: "https://baufest.com/wp-content/uploads/2023/12/banca_digital.jpg",
      title: "App Móvil Actualizada",
      description: "Descarga la nueva versión con mejores funciones"
    }
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-lg">
              <img
                src="./src/assets/Logo Banco Nacional de Guatemala.png"
                alt="Logo Banco de Guatemala"
                className="h-8 w-8 object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">Banco de Guatemala</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button
              className="bg-white text-blue-800 hover:bg-blue-100 font-medium py-2 px-6 rounded-lg transition-colors"
              onClick={() => navigate('/login')}
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </header>
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex overflow-x-auto hide-scrollbar">
            {[
              {
                id: "inicio",
                label: "Inicio",
                icon: <HomeIcon className="h-5 w-5" />,
                path: "/HomePage"
              },
              {
                id: "ayuda",
                label: "Ayuda",
                icon: <QuestionMarkCircleIcon className="h-5 w-5" />,
                path: "/HelpList"
              },
              {
                id: "contacto",
                label: "Contacto",
                icon: <EnvelopeIcon className="h-5 w-5" />,
                path: "/ContactList"
              }
            ].map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSection === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="relative mb-10 rounded-2xl overflow-hidden shadow-xl">
        <div className="relative h-64 md:h-96 w-full">
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex items-end pb-10 md:pb-16 lg:pb-20 px-6 md:px-10 lg:px-16">
                <div className="text-white">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{item.title}</h3>
                  <p className="text-lg md:text-xl mb-4 max-w-2xl">{item.description}</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition-colors shadow-md">
                    Conocer más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-800" />
        </button>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 max-w-md mx-auto lg:max-w-2xl">
        {[
          {
            title: "Ayuda",
            description: "Encuentra respuestas",
            icon: <QuestionMarkCircleIcon className="h-8 w-8" />,
            color: "bg-purple-100 text-purple-800",
            hover: "hover:bg-purple-600 hover:text-white",
            path: "/HelpList",
            onClick: () => navigate("/HelpList")
          },
          {
            title: "Contacto",
            description: "Habla con nosotros",
            icon: <EnvelopeIcon className="h-8 w-8" />,
            color: "bg-orange-100 text-orange-800",
            hover: "hover:bg-orange-600 hover:text-white",
            path: "/ContactList",
            onClick: () => navigate("/ContactList")
          }
        ].map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className={`${card.color} ${card.hover} rounded-xl p-6 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg flex items-center`}
          >
            <div className="mr-4">
              {card.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg">{card.title}</h3>
              <p className="text-sm">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Nuestros productos modernizado */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Nuestros Productos</h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            Ver todos <ArrowRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            return (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg mr-4 ${product.icon.props.className.includes('text-blue-600') ? 'bg-blue-100' :
                      product.icon.props.className.includes('text-purple-600') ? 'bg-purple-100' :
                        product.icon.props.className.includes('text-green-600') ? 'bg-green-100' : 'bg-red-100'}`}>
                      {product.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate(product.route)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    Solicitar ahora
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
      {/* Opciones de inversión modernizado */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Opciones de Inversión</h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            Ver todas <ArrowRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {investments.map((investment) => (
            <div key={investment.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="h-40 overflow-hidden relative">
                <img
                  src={investment.image}
                  alt={investment.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg mr-4 ${investment.icon.props.className.includes('text-green-600') ? 'bg-green-100' :
                    investment.icon.props.className.includes('text-yellow-600') ? 'bg-yellow-100' :
                      investment.icon.props.className.includes('text-blue-600') ? 'bg-blue-100' : 'bg-purple-100'}`}>
                    {investment.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{investment.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{investment.description}</p>
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="text-green-800 font-semibold flex items-center">
                    <ArrowTrendingUpIcon className="h-5 w-5 mr-2" />
                    Retorno estimado: {investment.roi}
                  </div>
                </div>
                <button
                  onClick={() => navigate(investment.route)} // ¡Aquí está el cambio clave para inversiones!
                  className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                >
                  Invertir ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Centro de ayuda modernizado */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Centro de Ayuda</h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            Ver todo <ArrowRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {helpTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(topic.link)}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg mr-4 ${topic.icon.props.className.includes('text-blue-500') ? 'bg-blue-100' :
                  topic.icon.props.className.includes('text-purple-500') ? 'bg-purple-100' :
                    topic.icon.props.className.includes('text-green-500') ? 'bg-green-100' : 'bg-orange-100'}`}>
                  {topic.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{topic.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{topic.description}</p>
              <div className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                Ver más <ArrowRightIcon className="h-4 w-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contáctanos modernizado */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Contáctanos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {contactMethods.map((method) => (
            <div key={method.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg mr-4 ${method.icon.props.className.includes('text-green-500') ? 'bg-green-100' :
                  method.icon.props.className.includes('text-orange-500') ? 'bg-orange-100' :
                    method.icon.props.className.includes('text-blue-500') ? 'bg-blue-100' : 'bg-purple-100'}`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{method.title}</h3>
              </div>
              <p className="text-gray-600 mb-2">{method.description}</p>
              <p className="text-lg font-semibold text-gray-800">{method.details}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900">Formulario de Contacto</h3>
            <p className="text-gray-600">Envíanos tus consultas y te responderemos a la brevedad</p>
          </div>
          <form className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nombre</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Asunto</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="¿Cómo podemos ayudarte?"
              />
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">Mensaje</label>
              <textarea
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Describe tu consulta en detalle"
              ></textarea>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-3 px-6 rounded-lg font-medium transition-all shadow-md hover:shadow-lg">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Banco de Guatemala</h3>
              <p className="text-gray-400">Tu socio financiero de confianza por más de 50 años.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Productos</h4>
              <ul className="space-y-2">
                {products.slice(0, 4).map((product) => (
                  <li key={product.id}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">{product.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Ayuda</h4>
              <ul className="space-y-2">
                {helpTopics.map((topic) => (
                  <li key={topic.id}>
                    <a href={topic.link} className="text-gray-400 hover:text-white transition-colors">{topic.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contacto</h4>
              <ul className="space-y-2">
                {contactMethods.map((method) => (
                  <li key={method.id} className="text-gray-400">
                    {method.title}: <span className="text-white">{method.details}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2023 Banco de Guatemala. Todos los derechos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="24"
                  height="24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.507 3.507 0 00-.748-1.15 3.507 3.507 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.048-1.351-.058-3.807-.058h-.468zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}