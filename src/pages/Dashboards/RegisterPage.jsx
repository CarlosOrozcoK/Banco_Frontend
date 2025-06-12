import { useState } from 'react';
import { 
  UserIcon,
  IdentificationIcon,
  HomeIcon,
  PhoneIcon,
  EnvelopeIcon,
  LockClosedIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import {useRegister}from "../../shared/hooks/useRegister"
import { validateUsername, validateEmail, validatePassword } from '../../shared/validators';

const RegisterPage = ({ switchAuthHandler }) => {
  const { register, isLoading } = useRegister();

  const [formData, setFormData] = useState({
    name: {
      value: '',
      isValid: false,
      showError: false,
    },
    username: {
      value: '',
      isValid: false,
      showError: false,
    },
    nickname: {
      value: '',
      isValid: true, // Opcional
      showError: false,
    },
    dpi: {
      value: '',
      isValid: false,
      showError: false,
    },
    direccion: {
      value: '',
      isValid: false,
      showError: false,
    },
    phone: {
      value: '',
      isValid: false,
      showError: false,
    },
    email: {
      value: '',
      isValid: false,
      showError: false,
    },
    password: {
      value: '',
      isValid: false,
      showError: false,
    },
    nombreTrabajo: {
      value: '',
      isValid: false,
      showError: false,
    },
    ingresosMensuales: {
      value: '',
      isValid: false,
      showError: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleInputValueChange = (value, field) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value
      }
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case 'email':
        isValid = validateEmail(value);
        break;
      case 'username':
        isValid = validateUsername(value);
        break;
      case 'password':
        isValid = validatePassword(value);
        break;
      case 'name':
        isValid = value.trim().length > 0;
        break;
      case 'dpi':
        isValid = value.length === 13;
        break;
      case 'phone':
        isValid = /^\d{8}$/.test(value);
        break;
      case 'direccion':
        isValid = value.trim().length > 0;
        break;
      case 'nombreTrabajo':
        isValid = value.trim().length > 0;
        break;
      case 'ingresosMensuales':
        isValid = !isNaN(value) && value.trim().length > 0;
        break;
      default:
        isValid = true;
    }

    setFormData(prevState => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid
      }
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    
    const allFieldsValid = Object.values(formData).every(field => field.isValid);
    if (!allFieldsValid) return;

    try {
      await register(
        formData.email.value,
        formData.password.value,
        formData.username.value,
        {
          name: formData.name.value,
          nickname: formData.nickname.value,
          dpi: formData.dpi.value,
          direccion: formData.direccion.value,
          phone: formData.phone.value,
          nombreTrabajo: formData.nombreTrabajo.value,
          ingresosMensuales: formData.ingresosMensuales.value
        }
      );
      setSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const isSubmitButtonDisabled = isLoading || 
    Object.values(formData).some(field => !field.isValid);

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Registro exitoso!</h2>
          <p className="text-gray-600 mb-6">Tu cuenta ha sido creada correctamente.</p>
          <button
            onClick={() => setSuccess(false)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Imagen lateral */}
            <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 hidden md:flex flex-col justify-center">
              <div className="text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Bienvenido al Banco de Guatemala</h2>
                <p className="text-blue-100 mb-6">Regístrate y accede a todos nuestros servicios financieros</p>
                <img 
                  src="https://t7m8e9c8.delivery.rocketcdn.me/wp-content/uploads/2020/01/hong-kong-tailandia-CBDC-criptomonedas-bancos-centrales-nacionales.jpg"
                  alt="Banking"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
            
            {/* Formulario */}
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Crear nueva cuenta</h2>
              <p className="text-gray-600 mb-6">Por favor completa todos los campos</p>
              
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Nombre completo */}
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name.value}
                      onChange={(e) => handleInputValueChange(e.target.value, 'name')}
                      onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'name')}
                      className={`block w-full pl-10 pr-3 py-2 border ${formData.name.showError ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="name"
                    />
                  </div>
                  {formData.name.showError && <p className="mt-1 text-sm text-red-600">Nombre completo es requerido</p>}
                </div>
                
                {/* Nombre de usuario */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username.value}
                    onChange={(e) => handleInputValueChange(e.target.value, 'username')}
                    onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'username')}
                    className={`block w-full px-3 py-2 border ${formData.username.showError ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="username"
                  />
                  {formData.username.showError && <p className="mt-1 text-sm text-red-600">Nombre de usuario es requerido</p>}
                </div>
                
                {/* Apodo */}
                <div>
                  <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
                    Apodo 
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname.value}
                    onChange={(e) => handleInputValueChange(e.target.value, 'nickname')}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="nickname"
                  />
                </div>
                
                {/* DPI */}
                <div>
                  <label htmlFor="dpi" className="block text-sm font-medium text-gray-700 mb-1">
                    DPI (13 dígitos)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IdentificationIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="dpi"
                      name="dpi"
                      value={formData.dpi.value}
                      onChange={(e) => handleInputValueChange(e.target.value, 'dpi')}
                      onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'dpi')}
                      maxLength="13"
                      className={`block w-full pl-10 pr-3 py-2 border ${formData.dpi.showError ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder=".............."
                    />
                  </div>
                  {formData.dpi.showError && <p className="mt-1 text-sm text-red-600">DPI debe tener 13 dígitos</p>}
                </div>
                
                {/* Teléfono */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone.value}
                      onChange={(e) => handleInputValueChange(e.target.value, 'phone')}
                      onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'phone')}
                      maxLength="8"
                      className={`block w-full pl-10 pr-3 py-2 border ${formData.phone.showError ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="55551234"
                    />
                  </div>
                  {formData.phone.showError && <p className="mt-1 text-sm text-red-600">Teléfono debe tener 8 dígitos</p>}
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email.value}
                      onChange={(e) => handleInputValueChange(e.target.value, 'email')}
                      onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'email')}
                      className={`block w-full pl-10 pr-3 py-2 border ${formData.email.showError ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="userName@example.com"
                    />
                  </div>
                  {formData.email.showError && <p className="mt-1 text-sm text-red-600">Email no válido</p>}
                </div>
                
                {/* Dirección */}
                <div className="md:col-span-2">
                  <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección completa
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HomeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="direccion"
                      name="direccion"
                      value={formData.direccion.value}
                      onChange={(e) => handleInputValueChange(e.target.value, 'direccion')}
                      onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'direccion')}
                      className={`block w-full pl-10 pr-3 py-2 border ${formData.direccion.showError ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Calle 10 #45-67, Ciudad Guatemala"
                    />
                  </div>
                  {formData.direccion.showError && <p className="mt-1 text-sm text-red-600">Dirección es requerida</p>}
                </div>
                
                {/* Contraseña */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password.value}
                      onChange={(e) => handleInputValueChange(e.target.value, 'password')}
                      onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'password')}
                      className={`block w-full pl-10 pr-10 py-2 border ${formData.password.showError ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                  {formData.password.showError && <p className="mt-1 text-sm text-red-600">Contraseña no válida</p>}
                </div>
                
                {/* Nombre del trabajo */}
                <div>
                  <label htmlFor="nombreTrabajo" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del trabajo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="nombreTrabajo"
                      name="nombreTrabajo"
                      value={formData.nombreTrabajo.value}
                      onChange={(e) => handleInputValueChange(e.target.value, 'nombreTrabajo')}
                      onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'nombreTrabajo')}
                      className={`block w-full pl-10 pr-3 py-2 border ${formData.nombreTrabajo.showError ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Ingeniero de Software"
                    />
                  </div>
                  {formData.nombreTrabajo.showError && (
                    <p className="mt-1 text-sm text-red-600">Nombre del trabajo es requerido</p>
                  )}
                </div>
                
                {/* Ingresos mensuales */}
                <div>
                  <label htmlFor="ingresosMensuales" className="block text-sm font-medium text-gray-700 mb-1">
                    Ingresos mensuales (Q)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="ingresosMensuales"
                      name="ingresosMensuales"
                      value={formData.ingresosMensuales.value}
                      onChange={(e) => handleInputValueChange(e.target.value, 'ingresosMensuales')}
                      onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'ingresosMensuales')}
                      className={`block w-full pl-10 pr-3 py-2 border ${formData.ingresosMensuales.showError ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder=".........."
                    />
                  </div>
                  {formData.ingresosMensuales.showError && (
                    <p className="mt-1 text-sm text-red-600">Debe ser un número válido</p>
                  )}
                </div>
                
                {/* Términos y condiciones */}
                <div className="flex items-center mt-4">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    Acepto los <a href="#" className="text-blue-600 hover:text-blue-500">términos y condiciones</a>
                  </label>
                </div>
                
                {/* Botón de envío */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitButtonDisabled}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Registrando...
                      </>
                    ) : (
                      'Registrarse'
                    )}
                  </button>
                </div>
              </form>
              
              {/* Enlace a login */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  ¿Ya tienes una cuenta?{' '}
                  <Link 
                    to="/login" 
                    className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                    onClick={switchAuthHandler}
                  >
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;