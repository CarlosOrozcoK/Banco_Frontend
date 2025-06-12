import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        nickname: '',
        dpi: '',
        direccion: '',
        phone: '',
        email: '',
        password: '',
        nombreTrabajo: '',
        ingresosMensuales: '',
        confirmarPassword: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const register = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            // Extract the needed fields for the registerRequest
            const { email, password, username } = formData;
            const response = await registerRequest({ email, password, username });

            if(response.error) {
                setError(response.error?.response?.data || 'Ocurrió un error al registrar, intenta de nuevo');
                toast.error(response.error?.response?.data || 'Ocurrió un error al registrar, intenta de nuevo');
                return;
            }

            const { userDetails } = response.data;
            localStorage.setItem('user', JSON.stringify(userDetails));
            
            setSuccess(true);
            toast.success('Usuario registrado exitosamente');
            navigate('/');
        } catch (err) {
            setError('Ocurrió un error al registrar, intenta de nuevo');
            toast.error('Ocurrió un error al registrar, intenta de nuevo');
        } finally {
            setIsLoading(false);
        }
    };

    return { 
        formData,
        isLoading,
        error,
        success,
        showPassword,
        handleChange,
        register,
        setShowPassword
    };
};