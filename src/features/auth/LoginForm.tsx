import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from './authApi';
import ErrorMessage from '../../shared/ui/ErrorMessage';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginRequest, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const res = await loginRequest({ email, password }).unwrap();
      dispatch(login({ name: res.user.name, email: res.user.email, token: res.token }));
      navigate('/');
    } catch (err: any) {
      setError(err.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Iniciar Sesión
      </Typography>
      
      {error && <ErrorMessage message={error} />}
      
      <TextField 
        fullWidth 
        margin="normal" 
        label="Email" 
        type="email"
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        required
        disabled={isLoading}
      />
      <TextField 
        fullWidth 
        margin="normal" 
        label="Contraseña" 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        required
        disabled={isLoading}
      />
      <Button type="submit" variant="contained" fullWidth disabled={isLoading} sx={{ mt: 3 }}>
        {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
      </Button>
    </Box>
  );
};

export default LoginForm; 