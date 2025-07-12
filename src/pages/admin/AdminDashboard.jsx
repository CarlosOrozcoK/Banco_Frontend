import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserGroupIcon,
  CreditCardIcon,
  BanknotesIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { Navbar } from '../../components/navbar';
import { 
  getAllUsers, 
  getCreditRequests, 
  processCredit,
  getRecentMovements,
  getServices,
  isAuthenticated,
  deleteUser,
  updateUser
} from '../../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    users: [],
    creditRequests: [],
    transactions: [],
    services: []
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.isAdmin && user?.role !== 'admin' && !user?.email?.includes('admin')) {
      navigate('/HomePage');
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersRes, creditsRes, transactionsRes, servicesRes] = await Promise.all([
        getAllUsers(),
        getCreditRequests(),
        getRecentMovements(),
        getServices()
      ]);

      setData({
        users: usersRes.data || [],
        creditRequests: creditsRes.data || [],
        transactions: transactionsRes.data || [],
        services: servicesRes.data || []
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreditAction = async (creditId, action) => {
    try {
      await processCredit(creditId, { status: action });
      await loadData();
      alert(`Crédito ${action === 'approved' ? 'aprobado' : 'rechazado'} exitosamente`);
    } catch (error) {
      alert('Error al procesar el crédito');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await deleteUser(userId);
        await loadData();
        alert('Usuario eliminado exitosamente');
      } catch (error) {
        alert('Error al eliminar usuario');
      }
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleUpdateUser = async (userData) => {
    try {
      await updateUser(selectedUser.id, userData);
      await loadData();
      setShowUserModal(false);
      alert('Usuario actualizado exitosamente');
    } catch (error) {
      alert('Error al actualizar usuario');
    }
  };

  const stats = [
    {
      title: 'Total Usuarios',
      value: data.users.length,
      icon: <UserGroupIcon className="h-8 w-8 text-blue-600" />,
      color: 'bg-blue-100'
    },
    {
      title: 'Solicitudes de Crédito',
      value: data.creditRequests.filter(c => c.status === 'pending').length,
      icon: <CreditCardIcon className="h-8 w-8 text-purple-600" />,
      color: 'bg-purple-100'
    },
    {
      title: 'Transacciones Hoy',
      value: data.transactions.length,
      icon: <BanknotesIcon className="h-8 w-8 text-green-600" />,
      color: 'bg-green-100'
    },
    {
      title: 'Servicios Activos',
      value: data.services.length,
      icon: <ShieldCheckIcon className="h-8 w-8 text-red-600" />,
      color: 'bg-red-100'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Resumen', icon: <ChartBarIcon className="h-5 w-5" /> },
    { id: 'users', name: 'Usuarios', icon: <UserGroupIcon className="h-5 w-5" /> },
    { id: 'credits', name: 'Créditos', icon: <CreditCardIcon className="h-5 w-5" /> },
    { id: 'transactions', name: 'Transacciones', icon: <BanknotesIcon className="h-5 w-5" /> },
    { id: 'services', name: 'Servicios', icon: <DocumentTextIcon className="h-5 w-5" /> }
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando panel de administración...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-600">Gestiona usuarios, créditos y servicios del banco</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.color} mr-4`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Actividad Reciente</h3>
                      <div className="space-y-3">
                        {data.transactions.slice(0, 5).map((transaction, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Transferencia</span>
                            <span className="font-medium">Q{transaction.amount || '0.00'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Créditos Pendientes</h3>
                      <div className="space-y-3">
                        {data.creditRequests.filter(c => c.status === 'pending').slice(0, 5).map((credit, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Solicitud #{credit.id}</span>
                            <span className="text-yellow-600 font-medium">Pendiente</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Gestión de Usuarios</h3>
                    <button 
                      onClick={loadData}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Actualizar
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.users.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name || user.username}</div>
                                <div className="text-sm text-gray-500">ID: {user.id}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                Activo
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button 
                                onClick={() => handleEditUser(user)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Credits Tab */}
              {activeTab === 'credits' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Solicitudes de Crédito</h3>
                  
                  <div className="space-y-4">
                    {data.creditRequests.map((credit) => (
                      <div key={credit.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Solicitud #{credit.id}</h4>
                            <p className="text-sm text-gray-600">Monto: Q{credit.amount}</p>
                            <p className="text-sm text-gray-600">Propósito: {credit.purpose}</p>
                          </div>
                          <div className="flex space-x-2">
                            {credit.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleCreditAction(credit.id, 'approved')}
                                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                >
                                  Aprobar
                                </button>
                                <button
                                  onClick={() => handleCreditAction(credit.id, 'rejected')}
                                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                >
                                  Rechazar
                                </button>
                              </>
                            )}
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              credit.status === 'approved' ? 'bg-green-100 text-green-800' :
                              credit.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {credit.status === 'approved' ? 'Aprobado' :
                               credit.status === 'rejected' ? 'Rechazado' : 'Pendiente'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transactions Tab */}
              {activeTab === 'transactions' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Transacciones Recientes</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.transactions.map((transaction, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.id || index}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Transferencia</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Q{transaction.amount || '0.00'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                Completada
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(transaction.date || Date.now()).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Services Tab */}
              {activeTab === 'services' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Servicios Contratados</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.services.map((service, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <p className="text-sm font-medium text-green-600">Q{service.price}</p>
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {service.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Edit Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium mb-4">Editar Usuario</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleUpdateUser({
                  name: formData.get('name'),
                  email: formData.get('email'),
                  phone: formData.get('phone')
                });
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={selectedUser.name}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={selectedUser.email}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input
                      type="text"
                      name="phone"
                      defaultValue={selectedUser.phone}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowUserModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
