import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../services/api';
import type { User } from '../types/User';
import { useNavigate } from 'react-router-dom';

interface AuthUser {
    id: number;
    name: string;
    email: string;
}

interface AppDataContextType {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    logout: () => void;
    login: (token: string, user: AuthUser) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('authToken'));

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    setIsLoading(true);
                    const response = await api.get('/me');
                    if (response.data && response.data.data) {
                        setUser(response.data.data);
                    } else {
                        setError('Gagal memuat data pengguna.');
                    }
                } catch (err) {
                    console.error('Error fetching /me:', err);
                    setError('Terjadi kesalahan saat memuat data.');
                    logout();
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
                setUser(null);
            }
        };

        fetchData();
    }, [token]);

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        setUser(null);
        navigate('/auth');
    };

    const login = (newToken: string, authUserData: AuthUser) => {
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('authUser', JSON.stringify(authUserData));
        setToken(newToken);
        navigate('/');
    };

    return (
        <AppDataContext.Provider value={{ user, isLoading, error, logout, login }}>
            {children}
        </AppDataContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppData = () => {
    const context = useContext(AppDataContext);
    if (context === undefined) {
        throw new Error('useAppData must be used within an AppDataProvider');
    }
    return context;
};