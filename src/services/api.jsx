import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/AlmacenadoraG1/vlm/",
  timeout: 5000,
});

export const login = async (data) => {
    try {
      const response = await apiClient.post("/users/login", data);
      console.log("Login response:", response);
      return response;
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  };
  
  export const register = async (data) => {
    try {
      const response = await apiClient.post("/users/register", data);
      return { data: response.data };
    } catch (e) {
      console.log("Error en el registro:", e.response);
      if (e.response && e.response.data && e.response.data.errors) {
        const errors = e.response.data.errors;
        errors.forEach((error) => {
          console.log(`Error: ${JSON.stringify(error)}`);
        });
      }
  
      return {
        error: true,
        response: e.response,
      };
    }
  };
  export const isAuthenticated = () => {
    const userDetails = localStorage.getItem("user");
    return !!userDetails;
};