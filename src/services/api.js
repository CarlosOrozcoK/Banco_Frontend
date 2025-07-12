import axios from 'axios';

const BASE_URL = 'http://localhost:3000/Backend_Banco/v1';

// Función helper para manejar errores de conexión
const handleConnectionError = (error, defaultMessage) => {
  if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
    return { error: 'Servidor no disponible. Verifique que el backend esté ejecutándose en localhost:3000' };
  }
  return { error: error.response?.data?.message || defaultMessage };
};

// Usuarios
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener usuarios');
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/user/${userId}`, userData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al actualizar usuario');
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al eliminar usuario');
  }
};

// Cuentas
export const getAllAccounts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/account/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener cuentas');
  }
};

export const createAccount = async (accountData) => {
  try {
    const response = await axios.post(`${BASE_URL}/account/create`, accountData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al crear cuenta');
  }
};

export const updateAccount = async (accountId, accountData) => {
  try {
    const response = await axios.put(`${BASE_URL}/account/${accountId}`, accountData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al actualizar cuenta');
  }
};

export const deleteAccount = async (accountId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/account/${accountId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al eliminar cuenta');
  }
};

// Créditos
export const getCreditRequests = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/credit/requests`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener solicitudes de crédito');
  }
};

export const requestCredit = async (creditData) => {
  try {
    const response = await axios.post(`${BASE_URL}/credit/request`, creditData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al solicitar crédito');
  }
};

export const processCredit = async (creditId, action) => {
  try {
    const response = await axios.post(`${BASE_URL}/credit/process/${creditId}`, { action }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al procesar crédito');
  }
};

// Transacciones
export const getRecentMovements = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions/my/recent`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener movimientos');
  }
};

export const getAllTransactions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions/top-movements`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener transacciones');
  }
};

export const transfer = async (originAccount, transferData) => {
  try {
    console.log('API: Iniciando transferencia:', { originAccount, transferData });
    const token = localStorage.getItem('token');
    console.log('API: Token presente:', !!token);
    
    const response = await axios.post(`${BASE_URL}/transactions/transfer/${originAccount}`, transferData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('API: Respuesta de transfer:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: Error en transfer:', error);
    return handleConnectionError(error, 'Error al realizar transferencia');
  }
};

export const deposit = async (depositData) => {
  try {
    const response = await axios.post(`${BASE_URL}/transactions/deposit`, depositData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al realizar depósito');
  }
};

// Servicios
export const getServices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/service/viewService`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener servicios');
  }
};

export const createService = async (serviceData) => {
  try {
    const response = await axios.post(`${BASE_URL}/service/createService`, serviceData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || 'Error al crear servicio' };
  }
};

export const updateService = async (serviceId, serviceData) => {
  try {
    const response = await axios.put(`${BASE_URL}/service/updateService/${serviceId}`, serviceData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || 'Error al actualizar servicio' };
  }
};

export const deleteService = async (serviceId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/service/deleteService/${serviceId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || 'Error al eliminar servicio' };
  }
};

// Productos
export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product/viewProduct`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener productos');
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/product/createProduct`, productData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al crear producto');
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${BASE_URL}/product/updateProduct/${productId}`, productData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al actualizar producto');
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/product/deleteProduct/${productId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al eliminar producto');
  }
};

// Marcas
export const getBrands = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/brand/viewBrand`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener marcas');
  }
};

export const createBrand = async (brandData) => {
  try {
    const response = await axios.post(`${BASE_URL}/brand/createBrand`, brandData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al crear marca');
  }
};

// Autenticación
export const isAuthenticated = () => {
  let token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  
  if (!userString) {
    return false;
  }
  
  try {
    const user = JSON.parse(userString);
    
    // Si no hay token separado pero hay token en el usuario, usarlo
    if (!token && user.token) {
      token = user.token;
      localStorage.setItem('token', token);
    }
    
    // Verificar que tengamos token y usuario válido
    return !!(token && user && (user.username || user.uid || user._id));
  } catch (error) {
    return false;
  }
};

export const isAdmin = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    return user?.isAdmin || 
           user?.role === 'admin' || 
           user?.role === 'ADMIN_ROLE' ||
           user?.email?.includes('admin') || 
           user?.username === 'ADMINB' ||
           user?.username?.toLowerCase().includes('admin');
  } catch (error) {
    return false;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al iniciar sesión');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al registrar usuario');
  }
};

export const getUserAccounts = async (userId) => {
  try {
    console.log('API: Obteniendo cuentas para userId:', userId);
    const token = localStorage.getItem('token');
    console.log('API: Token presente:', !!token);
    
    const response = await axios.get(`${BASE_URL}/account/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('API: Respuesta de getUserAccounts:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: Error en getUserAccounts:', error);
    return handleConnectionError(error, 'Error al obtener cuentas del usuario');
  }
};