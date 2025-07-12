import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import SwipePage from '../pages/Swipe';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/swipe" element={<PrivateRoute><SwipePage /></PrivateRoute>} />
    </Routes>
  </BrowserRouter>
);

export default App; 