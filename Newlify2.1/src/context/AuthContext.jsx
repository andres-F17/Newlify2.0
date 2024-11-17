import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext(null);

const mockUsers = [
  {
    id: 1,
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Juan Pérez',
    saldo: 1000000
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('wallet_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (credentials) => {
    const foundUser = mockUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        saldo: foundUser.saldo
      };
      setUser(userData);
      localStorage.setItem('wallet_user', JSON.stringify(userData));
      toast.success('¡Bienvenido!');
      return true;
    }
    
    toast.error('Credenciales inválidas');
    return false;
  };

  const register = (userData) => {
    toast.error('Registro temporalmente deshabilitado');
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wallet_user');
    toast.success('Sesión cerrada');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};