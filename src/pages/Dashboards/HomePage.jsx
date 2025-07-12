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
  ArrowRightIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";

const products = [
  {
    id: 1,
    title: "Cuenta Corriente",
    description:
      "Cuenta con beneficios exclusivos y sin costos de mantenimiento",
    icon: <CurrencyDollarIcon className="h-8 w-8 text-blue-600" />,
    image:
      "https://images.adsttc.com/media/images/5b88/452c/f197/cc41/9300/00b2/large_jpg/-_Featured_Image.jpg?1535657248",
    features: ["Sin comisiones", "Tarjeta débito incluida", "App móvil"],
    route: "/account/Balance", // Ruta específica para Cuenta Corriente
  },
  {
    id: 2,
    title: "Tarjetas de Crédito",
    description: "Elige la que mejor se adapte a tu estilo de vida",
    icon: <CreditCardIcon className="h-8 w-8 text-purple-600" />,
    image:
      "https://d25hb9r8pbsv4w.cloudfront.net/blog/wp-content/uploads/2019/10/04154421/Requisitos-para-solicitar-tarjeta-de-credito-1.jpg",
    features: ["Millas de viaje", "Cashback", "Seguros incluidos"],
    route: "/credit-card/request", // Ruta específica para Tarjetas de Crédito
  },
  {
    id: 3,
    title: "Transferencias y Pagos",
    description: "Financia tus proyectos con las mejores tasas",
    icon: <WalletIcon className="h-8 w-8 text-green-600" />,
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    features: [
      "Transferencia inmediata",
      "Tasas competitivas",
      "Pagos rápidos",
    ],
    route: "/products/transfer", // Ruta específica para Transferencias y Pagos
  },
  {
    id: 4,
    title: "Seguros",
    description: "Protege lo que más te importa",
    icon: <ShieldCheckIcon className="h-8 w-8 text-red-600" />,
    image:
      "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    features: ["Hogar", "Vehículo", "Vida", "Salud"],
    route: "/plan-selector", // Ruta específica para Seguros
  },
];

const investments = [
  {
    id: 1,
    title: "Fondos Mutuos",
    description: "Inversión diversificada con retornos competitivos",
    icon: <ChartBarIcon className="h-8 w-8 text-green-600" />,
    image:
      "https://images.unsplash.com/photo-1468254095679-bbcba94a7066?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    roi: "6-12% anual",
    route: "/products/mutual-funds", // Ejemplo de ruta para Fondos Mutuos
  },
  {
    id: 2,
    title: "Depósitos a Plazo",
    description: "Tasas fijas para tu seguridad financiera",
    icon: <BuildingLibraryIcon className="h-8 w-8 text-yellow-600" />,
    image:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    roi: "4-8% anual",
    route: "/products/time-deposits", // Ejemplo de ruta para Depósitos a Plazo
  },
  {
    id: 3,
    title: "Acciones",
    description: "Invierte en las principales empresas del mercado",
    icon: <ArrowTrendingUpIcon className="h-8 w-8 text-blue-600" />,
    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    roi: "Variable según mercado",
    route: "/broker", // ¡Aquí está la ruta para Acciones!
  },
  {
    id: 4,
    title: "Bienes Raíces",
    description: "Inversión inmobiliaria con rentabilidad a largo plazo",
    icon: <BuildingOfficeIcon className="h-8 w-8 text-purple-600" />,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    roi: "8-15% anual",
    route: "/products/real-estate", // Ejemplo de ruta para Bienes Raíces
  },
];

const helpTopics = [
  {
    id: 1,
    title: "Preguntas Frecuentes",
    description: "Encuentra respuestas a las consultas más comunes",
    icon: <DocumentTextIcon className="h-8 w-8 text-blue-500" />,
    link: "/HelpList",
  },
  {
    id: 2,
    title: "Tutoriales",
    description: "Aprende a usar nuestra plataforma paso a paso",
    icon: <QuestionMarkCircleIcon className="h-8 w-8 text-purple-500" />,
    link: "/tutoriales",
  },
  {
    id: 3,
    title: "Seguridad",
    description: "Consejos para proteger tus finanzas",
    icon: <LockClosedIcon className="h-8 w-8 text-green-500" />,
    link: "/ContactList",
  },
  {
    id: 4,
    title: "Términos y Condiciones",
    description: "Conoce nuestros términos de servicio",
    icon: <DocumentTextIcon className="h-8 w-8 text-orange-500" />,
    link: "/terms",
  },
];

const contactMethods = [
  {
    id: 1,
    title: "Atención Telefónica",
    description: "24/7 para asistencia inmediata",
    icon: <PhoneIcon className="h-8 w-8 text-green-500" />,
    details: "800 123 4567",
  },
  {
    id: 2,
    title: "Sucursales",
    description: "Encuentra nuestra red de oficinas",
    icon: <UserGroupIcon className="h-8 w-8 text-orange-500" />,
    details: "200+ ubicaciones",
  },
  {
    id: 3,
    title: "App Móvil",
    description: "Descarga nuestra aplicación",
    icon: <DevicePhoneMobileIcon className="h-8 w-8 text-blue-500" />,
    details: "Disponible en iOS y Android",
  },
  {
    id: 4,
    title: "Redes Sociales",
    description: "Síguenos en nuestras redes",
    icon: <GlobeAltIcon className="h-8 w-8 text-purple-500" />,
    details: "@Banco de Guatemala",
  },
];

export default function FullPageBank() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  // Función para verificar el estado del usuario
  const checkUserStatus = React.useCallback(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
        setIsLoggedIn(true);

        // Actualizar la lógica para detectar admin con tu usuario ADMINB
        const isAdminUser =
          userData.role === "admin" ||
          userData.email?.includes("admin") ||
          userData.isAdmin ||
          userData.username === "ADMINB" ||
          userData.username?.toLowerCase().includes("admin");

        setIsAdmin(isAdminUser);

        return true;
      } catch (error) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        return false;
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      return false;
    }
  }, []);

  React.useEffect(() => {
    checkUserStatus();
  }, [checkUserStatus]);

  // Escuchar cambios en localStorage para detectar login/logout
  React.useEffect(() => {
    const handleStorageChange = () => {
      checkUserStatus();
    };

    // Escuchar cambios en localStorage
    window.addEventListener("storage", handleStorageChange);

    // También escuchar un evento personalizado para cambios internos
    window.addEventListener("userStatusChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userStatusChange", handleStorageChange);
    };
  }, [checkUserStatus]);

  const [activeSection, setActiveSection] = React.useState("inicio");

  const carouselItems = [
    {
      id: 1,
      image:
        "https://www.criptonoticias.com/wp-content/uploads/2017/11/Bank-Ayudhya-krungsri-blockchain.jpeg",
      title: "Promoción Especial",
      description: "Obtén un 1% adicional en tus inversiones este mes",
    },
    {
      id: 2,
      image:
        "https://wallpapers.com/images/hd/american-express-black-card-edition-ztp35b177avvafmr.jpg",
      title: "Nueva Tarjeta Platino",
      description: "Beneficios exclusivos para clientes preferenciales",
    },
    {
      id: 3,
      image: "https://baufest.com/wp-content/uploads/2023/12/banca_digital.jpg",
      title: "App Móvil Actualizada",
      description: "Descarga la nueva versión con mejores funciones",
    },
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carouselItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar isLoggedIn={isLoggedIn} onLoginClick={() => navigate("/login")} />

      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex overflow-x-auto hide-scrollbar">
            {[
              {
                id: "inicio",
                label: "Inicio",
                icon: <HomeIcon className="h-5 w-5" />,
                path: "/HomePage",
              },
              {
                id: "ayuda",
                label: "Ayuda",
                icon: <QuestionMarkCircleIcon className="h-5 w-5" />,
                path: "/HelpList",
              },
              {
                id: "contacto",
                label: "Contacto",
                icon: <EnvelopeIcon className="h-5 w-5" />,
                path: "/ContactList",
              },
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
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex items-end pb-10 md:pb-16 lg:pb-20 px-6 md:px-10 lg:px-16">
                <div className="text-white">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-lg md:text-xl mb-4 max-w-2xl">
                    {item.description}
                  </p>
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
              className={`h-3 w-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-6" : "bg-white/50"
              }`}
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
            onClick: () => navigate("/HelpList"),
          },
          {
            title: "Contacto",
            description: "Habla con nosotros",
            icon: <EnvelopeIcon className="h-8 w-8" />,
            color: "bg-orange-100 text-orange-800",
            hover: "hover:bg-orange-600 hover:text-white",
            path: "/ContactList",
            onClick: () => navigate("/ContactList"),
          },
          // Agregar botón de admin condicionalmente
          ...(isLoggedIn && isAdmin
            ? [
                {
                  title: "Panel Admin",
                  description: "Gestionar sistema",
                  icon: <CogIcon className="h-8 w-8" />,
                  color: "bg-yellow-100 text-yellow-800",
                  hover: "hover:bg-yellow-600 hover:text-white",
                  path: "/admin",
                  onClick: () => navigate("/admin"),
                },
              ]
            : []),
        ].map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className={`${card.color} ${card.hover} rounded-xl p-6 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg flex items-center`}
          >
            <div className="mr-4">{card.icon}</div>
            <div>
              <h3 className="font-bold text-lg">{card.title}</h3>
              <p className="text-sm">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Remover el botón grande de admin ya que ahora está integrado arriba */}
      {/* El código del botón grande se puede eliminar ya que ahora tenemos el botón integrado */}

      {/* Nuestros productos modernizado */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Nuestros Productos
          </h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            Ver todos <ArrowRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
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
                    <div
                      className={`p-3 rounded-lg mr-4 ${
                        product.icon.props.className.includes("text-blue-600")
                          ? "bg-blue-100"
                          : product.icon.props.className.includes(
                              "text-purple-600"
                            )
                          ? "bg-purple-100"
                          : product.icon.props.className.includes(
                              "text-green-600"
                            )
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {product.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {product.title}
                    </h3>
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
            );
          })}
        </div>
      </section>
      {/* Opciones de inversión modernizado */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Opciones de Inversión
          </h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            Ver todas <ArrowRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {investments.map((investment) => (
            <div
              key={investment.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
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
                  <div
                    className={`p-3 rounded-lg mr-4 ${
                      investment.icon.props.className.includes("text-green-600")
                        ? "bg-green-100"
                        : investment.icon.props.className.includes(
                            "text-yellow-600"
                          )
                        ? "bg-yellow-100"
                        : investment.icon.props.className.includes(
                            "text-blue-600"
                          )
                        ? "bg-blue-100"
                        : "bg-purple-100"
                    }`}
                  >
                    {investment.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {investment.title}
                  </h3>
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
          <button
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            onClick={() => navigate("/HelpList")}
          >
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
                <div
                  className={`p-3 rounded-lg mr-4 ${
                    topic.icon.props.className.includes("text-blue-500")
                      ? "bg-blue-100"
                      : topic.icon.props.className.includes("text-purple-500")
                      ? "bg-purple-100"
                      : topic.icon.props.className.includes("text-green-500")
                      ? "bg-green-100"
                      : "bg-orange-100"
                  }`}
                >
                  {topic.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {topic.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-6">{topic.description}</p>
              <div
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer"
                onClick={() => navigate("/HelpList")}
              >
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
            <div
              key={method.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`p-3 rounded-lg mr-4 ${
                    method.icon.props.className.includes("text-green-500")
                      ? "bg-green-100"
                      : method.icon.props.className.includes("text-orange-500")
                      ? "bg-orange-100"
                      : method.icon.props.className.includes("text-blue-500")
                      ? "bg-blue-100"
                      : "bg-purple-100"
                  }`}
                >
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {method.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-2">{method.description}</p>
              <p className="text-lg font-semibold text-gray-800">
                {method.details}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900">
              Formulario de Contacto
            </h3>
            <p className="text-gray-600">
              Envíanos tus consultas y te responderemos a la brevedad
            </p>
          </div>
          <form className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Asunto
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="¿Cómo podemos ayudarte?"
              />
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">
                Mensaje
              </label>
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
      <Footer
        products={products}
        helpTopics={helpTopics}
        contactMethods={contactMethods}
      />
    </div>
  );
}
