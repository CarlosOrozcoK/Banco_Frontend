import { useState } from 'react';
import { transfer } from '../../services';

export const useTransfer = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const transferFunds = async (originAccount, data) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await transfer(originAccount, data);

            if (res.error) {
                setError(res.response?.data?.message || 'Error al transferir fondos');
            } else {
                setResult(res.data);
            }

            setLoading(false);
            return res;
        } catch (e) {
            setError('Error inesperado al transferir fondos');
            setLoading(false);
            return { error: true };
        }
    };

    return {
        transferFunds,
        loading,
        error,
        result,
    };
};
