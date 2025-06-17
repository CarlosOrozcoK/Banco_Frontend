import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from "../services/api"

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loginUser = async (credentials) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await login(credentials);
            
            if(response.error) {
                setError(response.message || "Error al iniciar sesión");
                return false;
            }
            
            navigate('/dashboard'); 
            return true;
        } catch (err) {
            setError("Error en el servidor");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loginUser, loading, error };
};