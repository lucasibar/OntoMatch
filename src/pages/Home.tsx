import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';
import { useGetProfileQuery } from '../features/user/userApi';
import { Button, Box, Typography, Container, CircularProgress, Avatar, Paper } from '@mui/material';
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
          <Paper elevation={3} sx={{ p: 3, mt: 3, maxWidth: 500, mx: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              {/* Foto de perfil */}
              <Avatar
                src={profile.profilePhoto}
                alt={profile.name}
                sx={{ 
                  width: 120, 
                  height: 120,
                  fontSize: '3rem',
                  bgcolor: 'primary.main'
                }}
              >
                {!profile.profilePhoto && profile.name.charAt(0).toUpperCase()}
              </Avatar>
              
              {/* Información del usuario */}
              <Typography variant="h5" gutterBottom>
                ¡Hola, {profile.name}!
              </Typography>
              
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {profile.email}
              </Typography>
              
              {profile.bio && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  "{profile.bio}"
                </Typography>
              )}
              
              <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                Buscas: {profile.lookingFor}
              </Typography>
            </Box>
          </Paper>
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