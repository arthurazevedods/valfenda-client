import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; // Importando PropTypes

// Criando o contexto
const AuthContext = createContext();

// Provider de autenticação
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
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
