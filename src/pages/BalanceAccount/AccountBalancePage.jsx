import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserAccounts, isAuthenticated } from '../../services/api';
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';

const CURRENCY_API_URL = 'https://api.exchangerate-api.com/v4/latest/GTQ';

const AccountBalancePage = () => {
  const [account, setAccount] = useState(null);
  const [rates, setRates] = useState({ USD: null, EUR: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    const loadAccountData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id || user?.userId || user?._id;
        
        if (userId) {
          const result = await getUserAccounts(userId);
          
          if (result.error) {
            setError('Error al cargar los datos de la cuenta');
          } else {
            // Actualizar según estructura de respuesta de la API
            const userAccount = result.data?.accounts?.[0];
            if (userAccount) {
              setAccount({
                name: user.name || user.fullName || user.username || 'Usuario',
                noCuenta: userAccount.noCuenta,
                saldo: userAccount.saldo || 0,
                tipoCuenta: userAccount.tipoCuenta || 'AHORRO',
                updatedAt: userAccount.updatedAt || new Date().toISOString()
              });
            } else {
              setError('No se encontraron cuentas asociadas');
            }
          }
        } else {
          setError('Usuario no identificado');
        }
      } catch (err) {
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    loadAccountData();
  }, [navigate]);

  useEffect(() => {
    fetch(CURRENCY_API_URL)
      .then(res => res.json())
      .then(data => {
        setRates({
          USD: data.rates?.USD ?? null,
          EUR: data.rates?.EUR ?? null
        });
      })
      .catch(() => setRates({ USD: null, EUR: null }));
  }, []);

  if (loading) {
    return (
      <>
        <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando información de cuenta...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Reintentar
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
              <h1 className="text-2xl font-bold text-white">Resumen de Cuenta</h1>
              <p className="text-blue-100 mt-1">Consulta tu saldo actual</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-700">{account?.name}</h2>
                <p className="text-sm text-gray-500">No. Cuenta: {account?.noCuenta}</p>
              </div>

              <div className="text-center bg-indigo-50 border border-indigo-200 rounded-xl py-6">
                <p className="text-gray-500 text-sm">Saldo Disponible</p>
                <h3 className="text-4xl font-bold text-indigo-700">Q{account?.saldo?.toFixed(2)}</h3>
                <div className="mt-2 text-gray-600 text-sm">
                  {rates.USD && (
                    <p>USD: ${(account?.saldo * rates.USD).toFixed(2)}</p>
                  )}
                  {rates.EUR && (
                    <p>EUR: €{(account?.saldo * rates.EUR).toFixed(2)}</p>
                  )}
                  {(!rates.USD || !rates.EUR) && (
                    <p className="text-xs text-gray-400">Cargando tasas de cambio...</p>
                  )}
                </div>
              </div>

              <div className="text-center text-sm text-gray-600">
                <p>Tipo de cuenta: <span className="font-medium">{account?.tipoCuenta}</span></p>
                <p>Última actualización: {new Date(account?.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer 
            products={[
                { id: 1, title: 'Cuentas de Ahorro' },
                { id: 2, title: 'Tarjetas de Crédito' },
                { id: 3, title: 'Préstamos' },
                { id: 4, title: 'Seguros de Vida' }
            ]}
            helpTopics={[
                { id: 1, title: 'Preguntas Frecuentes', link: '/HelpList' },
                { id: 2, title: 'Soporte Técnico', link: '/ContactList' },
                { id: 3, title: 'Términos y Condiciones', link: '#' }
            ]}
            contactMethods={[
                { id: 1, title: 'Teléfono', details: '1234-5678' },
                { id: 2, title: 'Email', details: 'info@banco.gt' },
                { id: 3, title: 'Sucursales', details: '50+ ubicaciones' }
            ]}
        />
    </>
  );
};

export default AccountBalancePage;
