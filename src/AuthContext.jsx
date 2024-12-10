import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Criando o contexto
const AuthContext = createContext();

// Provider de autenticação
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            // Aqui você pode buscar os dados do usuário se necessário
            // Exemplo: const userData = fetchUserData(token);
            // setUser(userData);
        }
    }, []);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        // Armazenando o token no localStorage
        localStorage.setItem('token', userData.token);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar o contexto
export const useAuth = () => {
    return useContext(AuthContext);
};

// Definindo a validação das propriedades
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
