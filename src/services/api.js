import axios from 'axios';

const BASE_URL = 'http://localhost:3000/Backend_Banco/v1';

// Crear instancia de axios
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Función helper para manejar errores de conexión
const handleConnectionError = (error, defaultMessage) => {
  if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
    return { error: 'Servidor no disponible. Verifique que el backend esté ejecutándose en localhost:3000' };
  }
  return { error: error.response?.data?.message || defaultMessage };
};

apiClient.interceptors.request.use(
  (config) => {
    const publicPaths = ["/auth/login", "/auth/register"];

    if (!publicPaths.some((path) => config.url.includes(path))) {
      const userStr = localStorage.getItem("user");

      if (!userStr) return Promise.reject(new Error("No autorizado"));

      try {
        const user = JSON.parse(userStr);
        const token = user.token || user.userDetails?.token;

        if (!token) return Promise.reject(new Error("No autorizado"));

        const parts = token.split(".");
        if (parts.length !== 3) throw new Error("Token inválido");

        const payload = JSON.parse(atob(parts[1]));
        const now = Math.floor(Date.now() / 1000);

        if (payload.exp < now) {
          localStorage.clear();
          return Promise.reject(new Error("Token expirado"));
        }

        config.headers["x-token"] = token;
      } catch (error) {
        localStorage.clear();
        console.error("Error en interceptor:", error);
        return Promise.reject(new Error("Token inválido"));
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Usuarios
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get('/user/');
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener usuarios');
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/user/${userId}`, userData);
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al actualizar usuario');
  }
};


export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/user/${userId}`);
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al eliminar usuario');
  }
};

// Cuentas
export const getAllAccounts = async () => {
  try {
    const response = await apiClient.get('/accounts/');
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener cuentas');
  }
};

export const createAccount = async (accountData) => {
  try {
    const response = await apiClient.post('/accounts/create', accountData);
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al crear cuenta');
  }
};

export const updateAccount = async (accountId, accountData) => {
  try {
    const response = await apiClient.put(`/accounts/${accountId}`, accountData);
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al actualizar cuenta');
  }
};

export const deleteAccount = async (accountId) => {
  try {
    const response = await apiClient.delete(`/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al eliminar cuenta');
  }
};

// Créditos
export const getCreditRequests = async () => {
  try {
    const response = await apiClient.get('/credit/requests');
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener solicitudes de crédito');
  }
};

export const requestCredit = async (creditData) => {
  try {
    const response = await apiClient.post('/credit/request', creditData);

    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al solicitar crédito');
  }
};

export const processCredit = async (creditId, action) => {
  try {
    const response = await apiClient.post(`/credit/process/${creditId}`, { action });
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al procesar crédito');
  }
};

// Transacciones
export const getRecentMovements = async () => {
  try {
    const response = await apiClient.get('/transaction/my/recent');
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener movimientos');
  }
};

export const getAllTransactions = async () => {
  try {
    const response = await apiClient.get('/transactions/top-movements');
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener transacciones');
  }
};

export const transfer = async (originAccount, transferData) => {
  try {
    console.log('API: Iniciando transferencia:', { originAccount, transferData });
    const response = await apiClient.post(`/transaction/transfer/${originAccount}`, transferData);
    console.log('API: Respuesta de transfer:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: Error en transfer:', error);
    return handleConnectionError(error, 'Error al realizar transferencia');
  }
};

export const deposit = async (depositData) => {
  try {
    const response = await apiClient.post('/transactions/deposit', depositData);
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al realizar depósito');
  }
};

// Servicios
export const getServices = async () => {
  try {
    const response = await apiClient.get('/service/viewService');
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener servicios');
  }
};

export const createService = async (serviceData) => {
  try {
    const response = await apiClient.post('/service/createService', serviceData);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || 'Error al crear servicio' };
  }
};

export const updateService = async (serviceId, serviceData) => {
  try {
    const response = await apiClient.put(`/service/updateService/${serviceId}`, serviceData);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || 'Error al actualizar servicio' };
  }
};

export const deleteService = async (serviceId) => {
  try {
    const response = await apiClient.delete(`/service/deleteService/${serviceId}`);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || 'Error al eliminar servicio' };
  }
};

// Productos
export const getProducts = async () => {
  try {
    const response = await apiClient.get('/product/viewProduct');
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener productos');
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post('/product/createProduct', productData);
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al crear producto');
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await apiClient.put(`/product/updateProduct/${productId}`, productData);
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al actualizar producto');
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await apiClient.delete(`/product/deleteProduct/${productId}`);
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al eliminar producto');
  }
};

// Marcas
export const getBrands = async () => {
  try {
    const response = await apiClient.get('/brand/viewBrand');
    return response.data;
  } catch (error) {
    return handleConnectionError(error, 'Error al obtener marcas');
  }
};

export const createBrand = async (brandData) => {
  try {
    const response = await apiClient.post('/brand/createBrand', brandData);
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
    const response = await apiClient.get(`/accounts/user/${userId}`);
    console.log('API: Respuesta de getUserAccounts:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: Error en getUserAccounts:', error);
    return handleConnectionError(error, 'Error al obtener cuentas del usuario');
  }
}; 