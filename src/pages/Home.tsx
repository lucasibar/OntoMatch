import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';
import { Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

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
        
        {user && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
              Hola, {user.name}!
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Email: {user.email}
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