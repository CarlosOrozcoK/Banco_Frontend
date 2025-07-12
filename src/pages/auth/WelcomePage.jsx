import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/HomePage");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <div className="flex flex-col items-center">
          <img
            src="https://t7m8e9c8.delivery.rocketcdn.me/wp-content/uploads/2020/01/hong-kong-tailandia-CBDC-criptomonedas-bancos-centrales-nacionales.jpg"
            alt="Banco de Guatemala"
            className="w-full h-40 object-cover rounded-lg shadow mb-6"
          />
          <h1 className="text-3xl font-bold text-blue-700 mb-2">¡Bienvenido!</h1>
          <p className="text-gray-600 mb-4">Redirigiendo a tu panel...</p>
          <div className="flex justify-center">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
