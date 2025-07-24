import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserGroupIcon,
  CreditCardIcon,
  BanknotesIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import { Navbar } from '../../components/navbar';
import {
  getAllUsers,
  createAccount,
  getAllAccounts,
  getCreditRequests,
  processCredit,
  requestCredit,
  getRecentMovements,
  getServices,
  createService,
  updateService,
  deleteService,
  updateUser,
  deleteUser,
  isAuthenticated
} from '../../services/api';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('users');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    try {
      const user = userString ? JSON.parse(userString) : null;

      // Verificar que haya usuario y token
      const userToken = user?.token;
      const hasToken = !!(token || userToken);
      const hasUser = !!user;

      // Si no hay token en localStorage separado, usar el del usuario
      if (!token && userToken) {
        localStorage.setItem('token', userToken);
      }

      if (!hasToken || !hasUser) {
        navigate('/login');
        return;
      }

      loadSectionData(activeSection);

    } catch (error) {
      navigate('/login');
    }
  }, [navigate, activeSection]);

  const loadSectionData = async (section) => {
    setLoading(true);
    try {
      let normalizedData = [];
      let result = {};

      console.log(`🔄 Cargando datos para sección: ${section}`);

      switch (section) {
        case 'users':
          result = await getAllUsers();
          break;
        case 'accounts':
          result = await getAllAccounts();
          break;
        case 'credits':
          result = await getCreditRequests();
          break;
        case 'services':
          result = await getServices();
          break;
        case 'transactions':
          result = await getRecentMovements();
          break;
        default:
          result = { data: [] };
      }

      console.log(`📊 Respuesta de la API para ${section}:`, result);

      // Normalizar la respuesta de la API
      if (result) {
        if (Array.isArray(result)) {
          // Si la respuesta es directamente un array
          normalizedData = result;
        } else if (result.accounts && Array.isArray(result.accounts)) {
          // Para cuentas que vienen en result.accounts
          normalizedData = result.accounts;
        } else if (result.data) {
          // Si los datos están en la propiedad 'data'
          if (Array.isArray(result.data)) {
            normalizedData = result.data;
          } else if (result.data.movements && Array.isArray(result.data.movements)) {
            normalizedData = result.data.movements;
          } else if (result.data.accounts && Array.isArray(result.data.accounts)) {
            normalizedData = result.data.accounts;
          } else if (result.data.credits && Array.isArray(result.data.credits)) {
            normalizedData = result.data.credits;
          } else if (result.data.services && Array.isArray(result.data.services)) {
            normalizedData = result.data.services;
          } else if (typeof result.data === 'object') {
            normalizedData = [result.data];
          }
        } else if (result.services && Array.isArray(result.services)) {
          normalizedData = result.services;
        } else if (result.users && Array.isArray(result.users)) {
          normalizedData = result.users;
        } else if (result.credits && Array.isArray(result.credits)) {
          normalizedData = result.credits;
        } else if (result.transactions && Array.isArray(result.transactions)) {
          normalizedData = result.transactions;
        } else if (result.movements && Array.isArray(result.movements)) {
          normalizedData = result.movements;
        } else if (result.error) {
          if (result.error.includes('no identificado') || result.error.includes('unauthorized')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
            return;
          }
        } else if (typeof result === 'object') {
          normalizedData = [result];
        }
      }

      console.log(`✅ Datos normalizados para ${section}:`, normalizedData);

      setData(prev => ({ ...prev, [section]: normalizedData }));
    } catch (error) {
      console.error(`❌ Error cargando datos para ${section}:`, error);
      if (error.response?.status === 401 || error.message?.includes('unauthorized')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }

      setData(prev => ({ ...prev, [section]: [] }));
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      let result = {};
      switch (activeSection) {
        case 'accounts':
          result = await createAccount(formData);
          break;
        case 'credits':
          result = await requestCredit(formData);
          break;
        case 'services':
          result = await createService(formData);
          break;
        case 'transactions':
        case 'reports':
        case 'settings':
          // Simular creación para datos no conectados a API
          const newItem = {
            id: Date.now(),
            ...formData,
            date: new Date(),
            status: 'Activo'
          };
          setData(prev => ({
            ...prev,
            [activeSection]: [...(prev[activeSection] || []), newItem]
          }));
          result = { data: newItem };
          break;
      }

      if (!result.error) {
        alert('Creado exitosamente');
        setShowModal(false);
        setFormData({});
        if (['users', 'accounts', 'credits', 'services'].includes(activeSection)) {
          loadSectionData(activeSection);
        }
      } else {
        alert('Error al crear');
      }
    } catch (error) {
      alert('Error al procesar');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      let result = {};
      switch (activeSection) {
        case 'users':
          result = await updateUser(selectedItem._id || selectedItem.id, formData);
          break;
        case 'credits': {
          // Para créditos, enviar datos específicos según aprobación o rechazo
          let creditData;
          if (modalType === 'approve') {
            creditData = {
              approve: true,
              dueDate: formData.dueDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 año por defecto
              observations: formData.observations || "Aprobado por buen historial",
              accountId: selectedItem.account?._id || selectedItem.account?.id || selectedItem.accountId
            };
          } else if (modalType === 'reject') {
            creditData = {
              approve: false,
              dueDate: formData.dueDate || new Date().toISOString().split('T')[0],
              observations: formData.observations || "Denegado por mal historial",
              accountId: selectedItem.account?._id || selectedItem.account?.id || selectedItem.accountId
            };
          } else {
            creditData = formData;
          }
          result = await processCredit(selectedItem.cid || selectedItem._id || selectedItem.id, creditData);
          break;
        }
        case 'services':
          result = await updateService(selectedItem._id || selectedItem.id, formData);
          break;
        case 'transactions':
        case 'reports':
        case 'settings':
          // Simular actualización
          setData(prev => ({
            ...prev,
            [activeSection]: prev[activeSection].map(item =>
              item.id === selectedItem.id ? { ...item, ...formData } : item
            )
          }));
          result = { data: { ...selectedItem, ...formData } };
          break;
      }

      if (!result.error) {
        alert('Actualizado exitosamente');
        setShowModal(false);
        setFormData({});
        if (['users', 'accounts', 'credits', 'services'].includes(activeSection)) {
          loadSectionData(activeSection);
        }
      } else {
        alert('Error al actualizar');
      }
    } catch (error) {
      alert('Error al procesar');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este elemento?')) return;

    setLoading(true);
    try {
      let result = {};
      switch (activeSection) {
        case 'users':
          result = await deleteUser(id);
          break;
        case 'services':
          result = await deleteService(id);
          break;
        case 'transactions':
        case 'reports':
        case 'settings':
          // Simular eliminación
          setData(prev => ({
            ...prev,
            [activeSection]: prev[activeSection].filter(item => item.id !== id)
          }));
          result = { data: { success: true } };
          break;
      }

      if (!result.error) {
        alert('Eliminado exitosamente');
        if (['users', 'accounts', 'credits', 'services'].includes(activeSection)) {
          loadSectionData(activeSection);
        }
      } else {
        alert('Error al eliminar');
      }
    } catch (error) {
      alert('Error al procesar');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, item = null) => {
    console.log("Abriendo modal con:", { type, item }); 
    setModalType(type);
    setSelectedItem(item);
    setFormData(item || {});
    setShowModal(true);
  };

  const sections = [
    { id: 'users', name: 'Usuarios', icon: <UserGroupIcon className="h-5 w-5" /> },
    { id: 'accounts', name: 'Cuentas', icon: <BanknotesIcon className="h-5 w-5" /> },
    { id: 'credits', name: 'Créditos', icon: <CreditCardIcon className="h-5 w-5" /> },
    { id: 'transactions', name: 'Transacciones', icon: <ArrowPathIcon className="h-5 w-5" /> },
    { id: 'services', name: 'Servicios', icon: <ShieldCheckIcon className="h-5 w-5" /> }
  ];

  const renderContent = () => {
    const currentData = data[activeSection] || [];
    const safeCurrentData = Array.isArray(currentData) ? currentData : [];

    switch (activeSection) {
      case 'users':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
              <div className="flex space-x-2">
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">API Conectada</span>
                <button
                  onClick={() => loadSectionData('users')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Actualizar
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">DPI</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trabajo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {safeCurrentData.length > 0 ? safeCurrentData.map((user) => (
                    <tr key={user._id || user.id || Math.random()}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">
                                {user.name?.charAt(0) || user.username?.charAt(0) || 'U'}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name || user.username || 'Sin nombre'}
                            </div>
                            <div className="text-sm text-gray-500">
                              @{user.username} {user.nickname && `(${user.nickname})`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email || 'No especificado'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.dpi || 'No especificado'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.phone || 'No especificado'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.nombreTrabajo || 'No especificado'}</div>
                        <div className="text-sm text-gray-500">
                          {user.ingresosMensuales ? `Q${user.ingresosMensuales.toLocaleString()}/mes` : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {user.estado ? 'Activo' : 'Inactivo'}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {user.role === 'CLIENT_ROLE' ? 'Cliente' : user.role}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => openModal('view', user)}
                          className="text-green-600 hover:text-green-900"
                          title="Ver detalles"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openModal('edit', user)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id || user.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        No hay usuarios disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Estadísticas adicionales */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Total Usuarios</div>
                <div className="text-2xl font-bold text-gray-900">{safeCurrentData.length}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Usuarios Activos</div>
                <div className="text-2xl font-bold text-green-600">
                  {safeCurrentData.filter(user => user.estado).length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Usuarios con Cuentas</div>
                <div className="text-2xl font-bold text-blue-600">
                  {safeCurrentData.filter(user => user.cuentas && user.cuentas.length > 0).length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Promedio Ingresos</div>
                <div className="text-2xl font-bold text-purple-600">
                  Q{safeCurrentData.length > 0 ?
                    Math.round(safeCurrentData.reduce((sum, user) => sum + (user.ingresosMensuales || 0), 0) / safeCurrentData.length).toLocaleString()
                    : '0'}
                </div>
              </div>
            </div>
          </div>
        );

      case 'accounts':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestión de Cuentas</h2>
              <div className="flex space-x-2">
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">API Conectada</span>
                <button
                  onClick={() => loadSectionData('accounts')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Actualizar
                </button>
                <button
                  onClick={() => openModal('create')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Nueva Cuenta
                </button>
              </div>
            </div>

            {/* Debug info */}
            <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm">
              <p><strong>Info del Sistema:</strong></p>
              <p>Datos cargados: {safeCurrentData.length} cuentas</p>
              <p>Usuario actual: {JSON.parse(localStorage.getItem('user') || '{}').username || 'No encontrado'}</p>
              <p>Estado de conexión: {localStorage.getItem('token') ? 'Conectado' : 'Desconectado'}</p>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No. Cuenta</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Saldo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {safeCurrentData.length > 0 ? safeCurrentData.map((account, index) => (
                    <tr key={account._id || account.id || index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {account.noCuenta || account.accountNumber || `ACC-${index + 1}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {account.tipoCuenta || account.accountType || 'AHORRO'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                        <span className={`${Number(account.saldo || account.balance || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          Q{Number(account.saldo || account.balance || 0).toLocaleString('es-GT', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div className="font-medium">{account.user?.name || account.user?.username || 'N/A'}</div>
                          {account.user?.email && (
                            <div className="text-xs text-gray-500">{account.user.email}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${(account.status !== false && account.estado !== false) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {(account.status !== false && account.estado !== false) ? 'Activa' : 'Inactiva'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {account.createdAt ? new Date(account.createdAt).toLocaleDateString('es-GT') : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => openModal('view', account)}
                          className="text-green-600 hover:text-green-900"
                          title="Ver detalles"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openModal('edit', account)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        {loading ? 'Cargando cuentas...' : 'No hay cuentas disponibles'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Estadísticas de cuentas */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Total Cuentas</div>
                <div className="text-2xl font-bold text-gray-900">{safeCurrentData.length}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Cuentas Activas</div>
                <div className="text-2xl font-bold text-green-600">
                  {safeCurrentData.filter(account => account.status !== false && account.estado !== false).length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Saldo Total</div>
                <div className="text-2xl font-bold text-blue-600">
                  Q{safeCurrentData.reduce((sum, account) => sum + Number(account.saldo || account.balance || 0), 0).toLocaleString('es-GT', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Promedio por Cuenta</div>
                <div className="text-2xl font-bold text-purple-600">
                  Q{safeCurrentData.length > 0 ?
                    (safeCurrentData.reduce((sum, account) => sum + Number(account.saldo || account.balance || 0), 0) / safeCurrentData.length).toLocaleString('es-GT', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })
                    : '0.00'}
                </div>
              </div>
            </div>
          </div>
        );

      case 'credits':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestión de Créditos</h2>
              <div className="flex space-x-2">
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">API Conectada</span>
                <button
                  onClick={() => openModal('create')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Nuevo Crédito
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {safeCurrentData.length > 0 ? safeCurrentData.map((credit) => (
                <div key={credit.cid || credit._id || credit.id || Math.random()} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">Solicitud #{credit.cid || credit._id || credit.id}</h3>
                      <p className="text-gray-600">Monto: Q{credit.amount}</p>
                      <p className="text-gray-600">Observaciones: {credit.observations || 'N/A'}</p>
                      {credit.user && (
                        <div className="mt-2 text-sm text-gray-500">
                          <p>Solicitante: {credit.user.name}</p>
                          <p>Email: {credit.user.email}</p>
                          <p>DPI: {credit.user.dpi}</p>
                          <p>Ingresos: Q{credit.user.ingresosMensuales}</p>
                        </div>
                      )}
                      {credit.account && (
                        <div className="mt-2 text-sm text-gray-500">
                          <p>Cuenta: {credit.account.noCuenta} ({credit.account.tipoCuenta})</p>
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Creado: {new Date(credit.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${credit.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          credit.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                        {credit.status === 'APPROVED' ? 'Aprobado' :
                          credit.status === 'REJECTED' ? 'Rechazado' : 'Pendiente'}
                      </span>
                      {credit.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => openModal('approve', credit)}
                            className="text-green-600 hover:text-green-900"
                            title="Aprobar"
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => openModal('reject', credit)}
                            className="text-red-600 hover:text-red-900"
                            title="Rechazar"
                          >
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500">
                  No hay solicitudes de crédito disponibles
                </div>
              )}
            </div>
          </div>
        );

      case 'transactions':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Transacciones Recientes</h2>
              <div className="flex space-x-2">
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">API Conectada</span>
                <button
                  onClick={() => loadSectionData('transactions')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Actualizar
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {safeCurrentData.length > 0 ? safeCurrentData.map((transaction, index) => (
                    <tr key={transaction._id || transaction.id || index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction._id?.slice(-6) || transaction.id || index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${transaction.type === 'TRANSFER_OUT' ? 'bg-red-100 text-red-800' :
                            transaction.type === 'TRANSFER_IN' ? 'bg-green-100 text-green-800' :
                              transaction.type === 'DEPOSIT' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                          }`}>
                          {transaction.type === 'TRANSFER_OUT' ? 'Salida' :
                            transaction.type === 'TRANSFER_IN' ? 'Entrada' :
                              transaction.type === 'DEPOSIT' ? 'Depósito' : transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Q{Number(transaction.amount || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                        {transaction.description || 'Sin descripción'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${transaction.status === false ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                          {transaction.status === false ? 'Revertida' : 'Completada'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.createdAt ? new Date(transaction.createdAt).toLocaleDateString() :
                          transaction.date ? new Date(transaction.date).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No hay transacciones disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'services':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestión de Servicios</h2>
              <div className="flex space-x-2">
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">API Conectada</span>
                <button
                  onClick={() => loadSectionData('services')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Actualizar
                </button>
                <button
                  onClick={() => openModal('create')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Nuevo Servicio
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {safeCurrentData.length > 0 ? safeCurrentData.map((service, index) => (
                    <tr key={service._id || service.id || index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {service.name || service.nombre || 'Servicio sin nombre'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {service.description || service.descripcion || 'Sin descripción'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {service.category || service.categoria || 'Sin categoría'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${service.status !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {service.status !== false ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {service.createdAt ? new Date(service.createdAt).toLocaleDateString('es-GT') : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => openModal('view', service)}
                          className="text-green-600 hover:text-green-900"
                          title="Ver detalles"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openModal('edit', service)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id || service.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        {loading ? 'Cargando servicios...' : 'No hay servicios disponibles'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Estadísticas de servicios */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Total Servicios</div>
                <div className="text-2xl font-bold text-gray-900">{safeCurrentData.length}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Servicios Activos</div>
                <div className="text-2xl font-bold text-green-600">
                  {safeCurrentData.filter(service => service.status !== false).length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500">Categorías</div>
                <div className="text-2xl font-bold text-blue-600">
                  {new Set(safeCurrentData.map(service => service.category || service.categoria)).size}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Selecciona una sección</div>;
    }
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-96 overflow-y-auto">
          <h3 className="text-lg font-medium mb-4">
            {modalType === 'create' ? 'Crear' : 
             modalType === 'edit' ? 'Editar' :
             modalType === 'approve' ? 'Aprobar' : 
             modalType === 'reject' ? 'Rechazar' :
             'Ver'} {
             modalType === 'approve' || modalType === 'reject' ? 'Crédito' : 
             sections.find(s => s.id === activeSection)?.name
            }
          </h3>

          <div className="space-y-4">
            {activeSection === 'accounts' && modalType === 'create' && (
              <>
                <input
                  type="text"
                  placeholder="ID del Usuario"
                  value={formData.userId || ''}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                
               <select
                  value={formData.tipoCuenta || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, tipoCuenta: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Elegir tipo de cuenta</option>
                  <option value="AHORRO">Ahorro</option>
                  <option value="MONETARIA">Monetaria</option>
                </select>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Saldo inicial (ej: 100.00)"
                  value={formData.saldo || ''}
                  onChange={(e) => setFormData({ ...formData, saldo: parseFloat(e.target.value) || 0 })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </>
            )}

            {activeSection === 'credits' && (modalType === 'approve' || modalType === 'reject') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de vencimiento
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate || (modalType === 'approve' ? 
                      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 
                      new Date().toISOString().split('T')[0])}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observaciones
                  </label>
                  <textarea
                    value={formData.observations || (modalType === 'approve' ? 
                      "Aprobado por buen historial" : 
                      "Denegado por mal historial")}
                    onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    rows="3"
                    placeholder={modalType === 'approve' ? 
                      "Motivo de aprobación..." : 
                      "Motivo de rechazo..."}
                    required
                  />
                </div>
                {selectedItem && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-2">Información del crédito:</h4>
                    <p className="text-sm text-gray-600">Monto: Q{selectedItem.amount}</p>
                    <p className="text-sm text-gray-600">Solicitante: {selectedItem.user?.name || 'N/A'}</p>
                    <p className="text-sm text-gray-600">Cuenta: {selectedItem.account?.noCuenta || 'N/A'}</p>
                  </div>
                )}
              </>
            )}

            {activeSection === 'credits' && modalType === 'create' && (
              <>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Monto (ej: 5000.00)"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="ID de la cuenta"
                  value={formData.accountId || ''}
                  onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <textarea
                  placeholder="Observaciones"
                  value={formData.observations || ''}
                  onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows="3"
                />
              </>
            )}

            {activeSection === 'services' && (modalType === 'create' || modalType === 'edit') && (
              <>
                <input
                  type="text"
                  placeholder="Nombre del servicio"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
                <textarea
                  placeholder="Descripción del servicio"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows="3"
                  required
                />
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="TRANSFERENCIAS">Transferencias</option>
                  <option value="PAGOS">Pagos</option>
                  <option value="CONSULTAS">Consultas</option>
                  <option value="CREDITOS">Créditos</option>
                  <option value="INVERSIONES">Inversiones</option>
                  <option value="SEGUROS">Seguros</option>
                  <option value="OTROS">Otros</option>
                </select>
                {modalType === 'edit' && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="serviceStatus"
                      checked={formData.status !== false}
                      onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="serviceStatus" className="text-sm text-gray-700">
                      Servicio activo
                    </label>
                  </div>
                )}
              </>
            )}

            {activeSection === 'services' && modalType === 'view' && selectedItem && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedItem.name || selectedItem.nombre}
                  </h3>
                  <p className="text-gray-500">{selectedItem.category || selectedItem.categoria}</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-500">Descripción:</span>
                    <p className="text-gray-900 mt-1">{selectedItem.description || selectedItem.descripcion}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-gray-500">Estado:</span>
                      <p className={selectedItem.status !== false ? 'text-green-600' : 'text-red-600'}>
                        {selectedItem.status !== false ? 'Activo' : 'Inactivo'}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Categoría:</span>
                      <p className="text-gray-900">{selectedItem.category || selectedItem.categoria}</p>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Fecha de creación:</span>
                    <p className="text-gray-900">
                      {selectedItem.createdAt ? new Date(selectedItem.createdAt).toLocaleString('es-GT') : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">ID:</span>
                    <p className="text-gray-900 font-mono text-xs">{selectedItem._id || selectedItem.id}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                if (modalType === 'create') {
                  handleCreate();
                } else if (modalType === 'edit') {
                  handleUpdate();
                } else if (modalType === 'approve' || modalType === 'reject') {
                  handleUpdate();
                }
              }}
              disabled={loading || (modalType === 'view')}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                modalType === 'view' ? 'hidden' : 
                modalType === 'approve' ? 'bg-green-600 hover:bg-green-700 disabled:bg-gray-400' :
                modalType === 'reject' ? 'bg-red-600 hover:bg-red-700 disabled:bg-gray-400' :
                'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400'
              }`}
            >
              {loading ? 'Procesando...' : 
               modalType === 'approve' ? 'Aprobar Crédito' :
               modalType === 'reject' ? 'Rechazar Crédito' :
               'Confirmar'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración Bancaria</h1>
            <p className="text-gray-600">Gestiona todas las operaciones y datos del banco</p>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeSection === section.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    {section.icon}
                    <span>{section.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Cargando datos...</p>
                </div>
              ) : (
                renderContent()
              )}
            </div>
          </div>
        </div>

        {renderModal()}
      </div>
    </>
  );
};

export default AdminPanel;