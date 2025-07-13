import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SwipeList from '../features/match/SwipeList';

const SwipePage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Encuentra tu Pareja
        </Typography>
        
        <Button 
          variant="outlined" 
          onClick={handleBackToHome}
          sx={{ mb: 3 }}
        >
          Volver al Inicio
        </Button>
        
        <SwipeList />
      </Box>
    </Container>
  );
};

export default SwipePage; 