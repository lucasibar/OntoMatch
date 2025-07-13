import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Avatar, 
  Chip,
  Button,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetMyMatchesQuery } from '../features/match/matchApi';

const MatchesPage = () => {
  const navigate = useNavigate();
  const { data: matches, isLoading, isError } = useGetMyMatchesQuery();

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleGoToChat = (matchId: string) => {
    // Navegar directamente al chat usando el matchId
    navigate(`/chat/match/${matchId}`);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mis Matches y Chats
        </Typography>
        
        <Button 
          variant="outlined" 
          onClick={handleBackToHome}
          sx={{ mb: 3 }}
        >
          Volver al Inicio
        </Button>
        
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        )}
        
        {isError && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body1" color="error">
              Error al cargar matches
            </Typography>
          </Box>
        )}
        
        {matches && matches.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Aún no tienes matches
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              ¡Sigue dando likes para encontrar tu pareja ideal!
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => navigate('/swipe')}
              sx={{ mt: 2 }}
            >
              Ir a Swipe
            </Button>
          </Box>
        )}
        
        {matches && matches.length > 0 && (
          <Box sx={{ display: 'grid', gap: 2, mt: 4 }}>
            {matches.map((match) => (
              <Card key={match.id} elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={match.user.profilePhoto}
                      alt={match.user.name}
                      sx={{ 
                        width: 80, 
                        height: 80,
                        fontSize: '2rem',
                        bgcolor: 'primary.main'
                      }}
                    >
                      {!match.user.profilePhoto && match.user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {match.user.name}
                      </Typography>
                      
                      <Chip 
                        label={`Busca: ${match.user.lookingFor}`} 
                        color="primary" 
                        size="small" 
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                      
                      {match.user.bio && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          "{match.user.bio}"
                        </Typography>
                      )}
                      
                      <Typography variant="caption" color="text.secondary">
                        Match desde: {new Date(match.createdAt).toLocaleDateString('es-ES')}
                      </Typography>
                    </Box>
                    
                    <Button 
                      variant="contained" 
                      onClick={() => handleGoToChat(match.id)}
                      sx={{ minWidth: 100 }}
                    >
                      Chatear
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default MatchesPage; 