import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PaperAirplaneIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { transfer, getUserAccounts, isAuthenticated } from '../../services/api';
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';

const TransferPage = () => {
  const [destinationAccount, setDestinationAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [userAccounts, setUserAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadUserAccounts();
  }, [navigate]);

  const loadUserAccounts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log('Usuario desde localStorage:', user);
      
      // Intentar diferentes formas de obtener el ID del usuario
      const userId = user?.id || user?.userId || user?._id || user?.uid;
      console.log('UserId encontrado:', userId);
      
      if (!userId) {
        setError("No se encontró información del usuario. Intenta cerrar sesión e iniciar nuevamente.");
        console.error('No se pudo obtener userId del usuario:', user);
        return;
      }

      console.log('Haciendo petición a getUserAccounts con userId:', userId);
      const accountsResult = await getUserAccounts(userId);
      console.log('Resultado de getUserAccounts:', accountsResult);
      
      if (accountsResult.error) {
        setError("Error al cargar cuentas: " + accountsResult.error);
        console.error('Error en getUserAccounts:', accountsResult.error);
      } else if (accountsResult.data?.accounts) {
        console.log('Cuentas encontradas:', accountsResult.data.accounts);
        setUserAccounts(accountsResult.data.accounts);
        if (accountsResult.data.accounts.length > 0) {
          setSelectedAccount(accountsResult.data.accounts[0]._id);
        }
      } else if (accountsResult.accounts) {
        // Caso alternativo si las cuentas vienen directamente
        console.log('Cuentas encontradas (formato alternativo):', accountsResult.accounts);
        setUserAccounts(accountsResult.accounts);
        if (accountsResult.accounts.length > 0) {
          setSelectedAccount(accountsResult.accounts[0]._id);
        }
      } else {
        setError("No se encontraron cuentas activas");
        console.log('No se encontraron cuentas en la respuesta:', accountsResult);
      }
    } catch (error) {
      setError('Error al cargar las cuentas');
      console.error('Error en loadUserAccounts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    console.log('Iniciando transferencia con datos:', {
      selectedAccount,
      destinationAccount,
      amount,
      message
    });

    if (!selectedAccount) {
      setError('Por favor selecciona una cuenta de origen');
      setLoading(false);
      return;
    }

    if (!destinationAccount) {
      setError('Por favor ingresa un ID de cuenta destino');
      setLoading(false);
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Por favor ingresa un monto válido mayor a 0');
      setLoading(false);
      return;
    }

    try {
      const transferData = {
        destinationAccount: destinationAccount,
        amount: parseFloat(amount),
        description: message || 'Transferencia bancaria'
      };

      console.log('Enviando transferencia:', {
        originAccount: selectedAccount,
        transferData
      });

      const response = await transfer(selectedAccount, transferData);
      console.log('Respuesta de transferencia:', response);
      
      if (response.error) {
        setError(response.error);
      } else if (response.msg) {
        setResult(response.msg || 'Transferencia realizada exitosamente');
        // Limpiar formulario
        setDestinationAccount('');
        setAmount('');
        setMessage('');
        // Recargar cuentas para actualizar saldos
        loadUserAccounts();
      } else {
        setError('Respuesta inesperada del servidor');
        console.log('Respuesta no esperada:', response);
      }
    } catch (error) {
      setError('Error de conexión. Intenta nuevamente.');
      console.error('Error en transferencia:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
              <h1 className="text-2xl font-bold text-white">Transferencia</h1>
              <p className="text-blue-100 mt-1">Transfiere a cualquier cuenta</p>
            </div>

            {/* Información de debug temporal */}
            <div className="bg-yellow-50 p-3 rounded-lg text-xs text-yellow-800 mb-4">
              <p><strong>Debug Info:</strong></p>
              <p>Usuario: {JSON.parse(localStorage.getItem('user') || '{}').username || 'No encontrado'}</p>
              <p>Cuentas cargadas: {userAccounts.length}</p>
              <p>Cuenta seleccionada: {selectedAccount || 'Ninguna'}</p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Cuenta origen */}
              {userAccounts.length > 0 && (
                <div>
                  <label htmlFor="originAccount" className="block text-sm font-medium text-gray-700 mb-1">
                    Cuenta de origen
                  </label>
                  <select
                    id="originAccount"
                    value={selectedAccount}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {userAccounts.map((account) => (
                      <option key={account._id} value={account._id}>
                        {account.noCuenta} - {account.tipoCuenta} (Q{account.saldo?.toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Cuenta destino */}
              <div>
                <label htmlFor="destinationAccount" className="block text-sm font-medium text-gray-700 mb-1">
                  ID de Cuenta destino
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PaperAirplaneIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="destinationAccount"
                    name="destinationAccount"
                    type="text"
                    required
                    value={destinationAccount}
                    onChange={(e) => setDestinationAccount(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ID de la cuenta (ej: 64f7a1b2c3d4e5f6a7b8c9d1)"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Ingresa el ID único de la cuenta destino (no el número de cuenta)
                </p>
              </div>

              {/* Monto */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Monto
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    required
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Mensaje / Concepto */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción (opcional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Pago de servicios, transferencia personal, etc."
                />
              </div>

              {/* Mensajes de estado */}
              {error && (
                <div className="text-red-500 text-sm text-center mb-2 bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}
              {result && (
                <div className="text-green-500 text-sm text-center mb-2 bg-green-50 p-3 rounded-lg">
                  {result}
                </div>
              )}

              {/* Información adicional */}
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                <p><strong>Nota:</strong> La transferencia se realizará inmediatamente entre las cuentas especificadas.</p>
                <p>Verifica que el ID de cuenta destino sea correcto antes de confirmar.</p>
              </div>

              {/* Botón transferir */}
              <div>
                <button
                  type="submit"
                  disabled={loading || userAccounts.length === 0}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading || userAccounts.length === 0 ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Procesando...
                    </>
                  ) : userAccounts.length === 0 ? (
                    'No hay cuentas disponibles'
                  ) : (
                    'Transferir'
                  )}
                </button>
              </div>
            </form>
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

export default TransferPage;
