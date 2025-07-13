import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { SignInButton } from '../shared/ui';

const LandingPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Bienvenido a OntoMatch
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Encuentra tu pareja ideal con nuestra plataforma de matching inteligente
          </Typography>
          <Box sx={{ mt: 4 }}>
            <SignInButton 
              size="large" 
              variant="contained" 
              color="primary"
              sx={{ mr: 2 }}
            >
              Comenzar Ahora
            </SignInButton>
          </Box>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Matching Inteligente
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nuestro algoritmo encuentra las mejores coincidencias basándose en tus preferencias.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Chat Seguro
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comunícate de forma segura con tus matches a través de nuestra plataforma.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Perfiles Verificados
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Todos nuestros usuarios pasan por un proceso de verificación para tu seguridad.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* CTA Section */}
        <Box sx={{ textAlign: 'center', py: 6, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            ¿Listo para encontrar el amor?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Únete a miles de usuarios que ya han encontrado su pareja ideal
          </Typography>
          <SignInButton 
            size="large" 
            variant="contained" 
            color="secondary"
          >
            Crear Cuenta Gratis
          </SignInButton>
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage; 