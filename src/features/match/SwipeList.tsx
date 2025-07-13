import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Stack, 
  Avatar, 
  Box, 
  Chip, 
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { useGetPotentialMatchesQuery } from '../user/userApi';
import { useLikeUserMutation } from './matchApi';

const SwipeList = () => {
  const { data: users, isLoading, isError } = useGetPotentialMatchesQuery();
  const [likeUser, { isLoading: isLiking }] = useLikeUserMutation();
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [showMatchDialog, setShowMatchDialog] = useState(false);
  const [matchedUser, setMatchedUser] = useState<any>(null);

  const handleLike = async (userId: string) => {
    try {
      const result = await likeUser(userId).unwrap();
      
      if (result.isMatch) {
        setMatchedUser(users?.[currentUserIndex]);
        setShowMatchDialog(true);
      }
      
      // Pasar al siguiente usuario
      setCurrentUserIndex(prev => prev + 1);
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  const handlePass = () => {
    // Simplemente pasar al siguiente usuario
    setCurrentUserIndex(prev => prev + 1);
  };

  const handleCloseMatchDialog = () => {
    setShowMatchDialog(false);
    setMatchedUser(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body1" color="error">
          Error al cargar usuarios
        </Typography>
      </Box>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body1" color="text.secondary">
          No hay usuarios disponibles para matching
        </Typography>
      </Box>
    );
  }

  // Si ya vimos todos los usuarios
  if (currentUserIndex >= users.length) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          ¡Has visto todos los usuarios!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Vuelve más tarde para ver nuevos usuarios
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => setCurrentUserIndex(0)}
          sx={{ mt: 2 }}
        >
          Ver de nuevo
        </Button>
      </Box>
    );
  }

  const currentUser = users[currentUserIndex];

  return (
    <>
      <Card elevation={3} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            {/* Foto de perfil */}
            <Avatar
              src={currentUser.profilePhoto}
              alt={currentUser.name}
              sx={{ 
                width: 200, 
                height: 200,
                fontSize: '4rem',
                bgcolor: 'primary.main',
                mb: 2
              }}
            >
              {!currentUser.profilePhoto && currentUser.name.charAt(0).toUpperCase()}
            </Avatar>
            
            {/* Información del usuario */}
            <Typography variant="h4" gutterBottom>
              {currentUser.name}
            </Typography>
            
            <Chip 
              label={`Busca: ${currentUser.lookingFor}`} 
              color="primary" 
              size="medium" 
              variant="outlined"
            />
            
            {currentUser.bio && (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                "{currentUser.bio}"
              </Typography>
            )}
            
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
              Se unió: {new Date(currentUser.createdAt).toLocaleDateString('es-ES')}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Botones de acción estilo Tinder */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 4 }}>
        {/* Botón X (Pass) */}
        <IconButton 
          onClick={handlePass}
          disabled={isLiking}
          sx={{ 
            bgcolor: 'white',
            border: '3px solid #ff6b6b',
            color: '#ff6b6b',
            width: 70,
            height: 70,
            '&:hover': { 
              bgcolor: '#ff6b6b',
              color: 'white',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease-in-out',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>✕</Typography>
        </IconButton>
        
        {/* Botón Corazón (Like) */}
        <IconButton 
          onClick={() => handleLike(currentUser.id)}
          disabled={isLiking}
          sx={{ 
            bgcolor: 'white',
            border: '3px solid #ff4757',
            color: '#ff4757',
            width: 70,
            height: 70,
            '&:hover': { 
              bgcolor: '#ff4757',
              color: 'white',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease-in-out',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>♥</Typography>
        </IconButton>
      </Box>

      {/* Dialog de match */}
      <Dialog open={showMatchDialog} onClose={handleCloseMatchDialog}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          ¡Es un match! 🎉
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              src={matchedUser?.profilePhoto}
              alt={matchedUser?.name}
              sx={{ 
                width: 100, 
                height: 100,
                fontSize: '2rem',
                bgcolor: 'primary.main',
                mx: 'auto',
                mb: 2
              }}
            >
              {!matchedUser?.profilePhoto && matchedUser?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h6" gutterBottom>
              ¡{matchedUser?.name} también te dio like!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ya pueden empezar a chatear
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={handleCloseMatchDialog} variant="contained">
            ¡Genial!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SwipeList; 