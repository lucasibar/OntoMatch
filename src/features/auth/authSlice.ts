import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  token: string | null;
}

const getInitialAuthState = (): AuthState => {
  const saved = localStorage.getItem('ontomatch_user');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        isAuthenticated: true,
        user: { name: parsed.name, email: parsed.email },
        token: parsed.token,
      };
    } catch {
      return { isAuthenticated: false, user: null, token: null };
    }
  }
  return { isAuthenticated: false, user: null, token: null };
};

const initialState: AuthState = getInitialAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; email: string; token: string }>) => {
      const { name, email, token } = action.payload;

      state.isAuthenticated = true;
      state.user = { name, email };
      state.token = token;

      // Guardar en localStorage
      localStorage.setItem('ontomatch_user', JSON.stringify({ name, email, token }));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      // Eliminar del localStorage
      localStorage.removeItem('ontomatch_user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer; 