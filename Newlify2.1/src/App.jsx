import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@context/AuthContext';
import MainApp from '@components/MainApp';
import AuthForm from '@components/AuthForm';
import { useAuth } from '@context/AuthContext';

function AppContent() {
  const { user, login, register, logout } = useAuth();
  const [isLogin, setIsLogin] = React.useState(true);

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <AuthForm 
          isLogin={isLogin} 
          onSubmit={isLogin ? login : register} 
        />
        <p className="text-center mt-4 text-neutral-dark">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-primary-light hover:text-primary"
          >
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    );
  }

  return <MainApp onLogout={logout} />;
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      <AppContent />
    </AuthProvider>
  );
}