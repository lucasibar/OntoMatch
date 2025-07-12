// Funcionalidades de autenticación (Login, Register, recuperación, etc.)
export { default as authSlice } from './authSlice';
export { login, logout } from './authSlice';
export { default as LoginForm } from './LoginForm';
export { default as RegisterForm } from './RegisterForm';
export { authApi, useLoginMutation, useRegisterMutation } from './authApi';

export const useAuth = () => {
  // Hook personalizado para autenticación
  return {
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {},
  };
}; 