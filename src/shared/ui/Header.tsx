import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { logout } from '../../features/auth/authSlice';
import { SignInButton } from './index';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={handleHome}
        >
          OntoMatch
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isAuthenticated ? (
            <>
              <Button 
                color="inherit" 
                onClick={() => navigate('/swipe')}
                variant="outlined"
                size="small"
              >
                Swipe
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/matches')}
                variant="outlined"
                size="small"
              >
                Matches
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/matches')}
                variant="outlined"
                size="small"
              >
                Chats
              </Button>
              <Typography variant="body2" sx={{ alignSelf: 'center' }}>
                Hola, {user?.name || user?.email}
              </Typography>
              <Button 
                color="inherit" 
                onClick={handleLogout}
                variant="outlined"
                size="small"
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <SignInButton 
                variant="outlined" 
                color="inherit"
                size="small"
              />
              <Button 
                color="inherit" 
                onClick={() => navigate('/register')}
                variant="contained"
                size="small"
              >
                Registrarse
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 