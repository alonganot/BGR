// AuthContext.js
import { createContext, useState, useContext, ReactNode } from 'react';

interface iAuthContext {
    isAuthenticated: boolean,
    login: () => void,
    logout: () => void
}
const AuthContext = createContext<iAuthContext | null>(null);

export const useAuthContext = () => useContext(AuthContext) as iAuthContext

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {        
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};