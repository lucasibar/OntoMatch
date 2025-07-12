import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';
import { useGetProfileQuery } from '../features/user/userApi';
import { Button, Box, Typography, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: profile, isLoading, isError } = useGetProfileQuery();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleStartMatching = () => {
    navigate('/swipe');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Bienvenido a OntoMatch
        </Typography>
        
        {isLoading && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>
              Cargando perfil...
            </Typography>
          </Box>
        )}
        
        {isError && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body1" color="error">
              Error al cargar perfil
            </Typography>
          </Box>
        )}
        
        {profile && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
              Hola, {profile.email}!
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Email: {profile.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID de Usuario: {profile.userId}
            </Typography>
          </Box>
        )}
        
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleLogout}
            sx={{ mr: 2 }}
          >
            Cerrar Sesión
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleStartMatching}
          >
            Comenzar Matching
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage; 