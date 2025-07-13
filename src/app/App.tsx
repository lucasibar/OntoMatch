import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import SwipePage from '../pages/Swipe';
import MatchesPage from '../pages/Matches';
import ChatPage from '../pages/Chat';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { Header } from '../shared/ui';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => (
  <BrowserRouter>
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/swipe" element={<PrivateRoute><SwipePage /></PrivateRoute>} />
          <Route path="/matches" element={<PrivateRoute><MatchesPage /></PrivateRoute>} />
          <Route path="/chat/:chatId" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
          <Route path="/chat/match/:matchId" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
          {/* Redirigir /chats a /matches */}
          <Route path="/chats" element={<Navigate to="/matches" replace />} />
        </Routes>
      </Box>
    </Box>
  </BrowserRouter>
);

export default App; 