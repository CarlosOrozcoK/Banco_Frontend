import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from '../../services';
import toast from "react-hot-toast";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await loginRequest({ username, password });
      
      if (response.error) {
        toast.error("Credenciales incorrectas");
        return { error: true };
      }

      // Verificar estructura de respuesta según API spec
      if (response.data?.userDetails?.token) {
        // Crear objeto usuario completo con la estructura correcta
        const userData = {
          ...response.data.userDetails,
          token: response.data.userDetails.token
        };
        
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Disparar evento de cambio de estado
        window.dispatchEvent(new Event('userStatusChange'));
        
        toast.success('Sesión iniciada correctamente');
        navigate('/');
        return { success: true, data: userData };
      } else {
        toast.error("Error en la respuesta del servidor");
        return { error: true };
      }
    } catch (error) {
      toast.error("Error de conexión");
      return { error: true };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
};
