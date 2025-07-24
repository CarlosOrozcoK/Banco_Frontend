import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://banco-backend-qzuk.onrender.com/Backend_Banco/v1",
  timeout: 5000,
});

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

// Auth endpoints
export const login = async (data) => {
  try {
    const response = await apiClient.post("/auth/login", data);

    if (response.data?.userDetails?.token) {
      const userData = {
        ...response.data.userDetails,
        token: response.data.userDetails.token,
      };
      localStorage.setItem("user", JSON.stringify(userData));
    }

    return response;
  } catch (e) {
    return { error: true, e };
  }
};

export const register = async (data) => {
  try {
    const response = await apiClient.post("/auth/register", data);
    return { data: response.data };
  } catch (e) {
    if (e.response?.data?.errors) {
      e.response.data.errors.forEach((error) =>
        console.log(`Error: ${JSON.stringify(error)}`)
      );
    }
    return { error: true, response: e.response };
  }
};

export const isAuthenticated = () => {
  const userDetails = localStorage.getItem("user");
  return !!userDetails;
};

// Account endpoints - Actualizados según API spec
export const createAccount = async (data) => {
  try {
    // Mapear datos al formato esperado por la API
    const accountData = {
      userId: data.userId,
      tipoCuenta: data.accountType || data.tipoCuenta || "AHORRO",
      saldo: parseFloat(data.balance || data.saldo || 0),
    };

    const response = await apiClient.post("/account/create", accountData);
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const getUserAccounts = async (userId) => {
  try {
    const response = await apiClient.get(`/account/user/${userId}`);
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const getAccountById = async (accountId) => {
  try {
    const response = await apiClient.get(`/account/${accountId}`);
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const getAllAccounts = async (limit = 10, from = 0) => {
  try {
    const response = await apiClient.get(
      `/account/?limit=${limit}&from=${from}`
    );
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

// Credit endpoints - Actualizados según API spec
export const requestCredit = async (data) => {
  try {
    // Mapear datos al formato esperado por la API
    const creditData = {
      amount: parseFloat(data.amount),
      accountId: data.accountId || data.userId, // Usar accountId según la API
      observations: data.purpose || data.observations || 'Solicitud de crédito'
    };
    
    const response = await apiClient.post("/credit/request", creditData);
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const getCreditRequests = async (status = 'PENDING') => {
  try {
    const response = await apiClient.get(`/credit/requests?status=${status}`);
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const processCredit = async (creditId, data) => {
  try {
    // Mapear datos al formato esperado por la API
    const processData = {
      approve: data.status === 'approved' || data.approve === true,
      dueDate: data.dueDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 año por defecto
      observations: data.observations || (data.status === 'approved' ? 'Solicitud aprobada' : 'Solicitud rechazada')
    };
    
    const response = await apiClient.post(`/credit/process/${creditId}`, processData);
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const payCredit = async (creditId, data) => {
  try {
    // Mapear datos al formato esperado por la API
    const paymentData = {
      accountId: data.accountId,
      amount: parseFloat(data.amount)
    };
    
    const response = await apiClient.post(`/credit/pay/${creditId}`, paymentData);
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

// Transaction endpoints - Actualizados según API spec
export const transfer = async (originAccount, data) => {
  try {
    // Mapear datos al formato esperado por la API
    const transferData = {
      destinationAccount: data.destinationAccount,
      amount: parseFloat(data.amount),
      description: data.message || data.description || 'Transferencia bancaria'
    };
    
    const response = await apiClient.post(
      `/transactions/transfer/${originAccount}`,
      transferData
    );
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const getRecentMovements = async () => {
  try {
    const response = await apiClient.get("/transactions/my/recent");
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const deposit = async (data) => {
  try {
    // Mapear datos al formato esperado por la API
    const depositData = {
      destinationAccount: data.destinationAccount || data.accountId,
      amount: parseFloat(data.amount),
      description: data.description || 'Depósito bancario'
    };
    
    const response = await apiClient.post("/transactions/deposit", depositData);
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const updateDeposit = async (transactionId, data) => {
  try {
    // Mapear datos al formato esperado por la API
    const updateData = {
      newAmount: parseFloat(data.newAmount || data.amount)
    };
    
    const response = await apiClient.put(
      `/transactions/deposit/${transactionId}`,
      updateData
    );
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const revertDeposit = async (transactionId) => {
  try {
    const response = await apiClient.post(
      `/transactions/revertdeposit/${transactionId}`
    );
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const getAccountTransactions = async (accountId, limit = 10, from = 0) => {
  try {
    const response = await apiClient.get(
      `/transactions/account/${accountId}?limit=${limit}&from=${from}`
    );
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const getTopMovements = async (limit = 10) => {
  try {
    const response = await apiClient.get(
      `/transactions/top-movements?limit=${limit}`
    );
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

// User endpoints - Actualizados según API spec
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get("/users/");
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const updateUser = async (id, data) => {
  try {
    // Mapear datos al formato esperado por la API
    const updateData = {
      ...(data.name && { name: data.name }),
      ...(data.nickname && { nickname: data.nickname }),
      ...(data.direccion && { direccion: data.direccion }),
      ...(data.phone && { phone: data.phone }),
      ...(data.profile && { profile: data.profile }),
      ...(data.nombreTrabajo && { nombreTrabajo: data.nombreTrabajo }),
      ...(data.ingresosMensuales && { ingresosMensuales: parseFloat(data.ingresosMensuales) })
    };
    
    const response = await apiClient.put(`/users/${id}`, updateData);
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const addFavoriteAccount = async (data) => {
  try {
    // Mapear datos al formato esperado por la API
    const favoriteData = {
      accountId: data.accountId,
      alias: data.alias || 'Cuenta Favorita'
    };
    
    const response = await apiClient.patch("/users/cuenta-favorito", favoriteData);
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

// Product endpoints
export const createProduct = async (data) => {
  try {
    const response = await apiClient.post("/product/createProduct", data);
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const getProducts = async () => {
  try {
    const response = await apiClient.get("/product/viewProduct");
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

// Service endpoints
export const createService = async (data) => {
  try {
    const response = await apiClient.post("/service/createService", data);
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const getServices = async () => {
  try {
    const response = await apiClient.get("/service/viewService");
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

// Brand endpoints
export const createBrand = async (data) => {
  try {
    const response = await apiClient.post("/brand/createBrand", data);
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export const getBrands = async () => {
  try {
    const response = await apiClient.get("/brand/viewBrand");
    return { data: response.data };
  } catch (e) {
    return { error: true, response: e.response };
  }
};

export default apiClient;
