import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      const userId = user?.id || user?.userId || user?._id || user?.uid;

      if (!userId) {
        setError("No se encontró información del usuario. Intenta cerrar sesión e iniciar nuevamente.");
        return;
      }

      const accountsResult = await getUserAccounts(userId);

      if (accountsResult.error) {
        setError("Error al cargar cuentas: " + accountsResult.error);
      } else if (accountsResult.data?.accounts && accountsResult.data.accounts.length > 0) {
        setUserAccounts(accountsResult.data.accounts);
        setSelectedAccount(accountsResult.data.accounts[0].aid);
      } else if (accountsResult.accounts && accountsResult.accounts.length > 0) {
        setUserAccounts(accountsResult.accounts);
        setSelectedAccount(accountsResult.accounts[0].aid);
      } else {
        setError("No se encontraron cuentas activas");
      }
    } catch (error) {
      setError('Error al cargar las cuentas');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

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

      const response = await transfer(selectedAccount, transferData);

      if (response.error) {
        setError(response.error);
      } else if (response.msg) {
        setResult(response.msg || 'Transferencia realizada exitosamente');
        setDestinationAccount('');
        setAmount('');
        setMessage('');
        loadUserAccounts();
      } else {
        setError('Respuesta inesperada del servidor');
      }
    } catch (error) {
      setError('Error de conexión. Intenta nuevamente.');
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
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
              <h1 className="text-2xl font-bold text-white">Transferencia</h1>
              <p className="text-blue-100 mt-1">Transfiere a cualquier cuenta</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg text-xs text-yellow-800 mb-4">
              <p><strong>Debug Info:</strong></p>
              <p>Usuario: {JSON.parse(localStorage.getItem('user') || '{}').username || 'No encontrado'}</p>
              <p>Cuentas cargadas: {userAccounts.length}</p>
              <p>Cuenta seleccionada: {selectedAccount || 'Ninguna'}</p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                    <option value="">Selecciona una cuenta</option>
                    {userAccounts.map((account) => (
                      <option key={account.aid} value={account.aid}>
                        {account.noCuenta} - {account.tipoCuenta} (Q{account.saldo?.toFixed(2)})
                      </option>
                    ))}
                  </select>

                </div>
              )}
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

              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                <p><strong>Nota:</strong> La transferencia se realizará inmediatamente entre las cuentas especificadas.</p>
                <p>Verifica que el ID de cuenta destino sea correcto antes de confirmar.</p>
              </div>

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
