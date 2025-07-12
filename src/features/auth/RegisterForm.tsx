import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';
import { useRegisterMutation } from './authApi';
import ErrorMessage from '../../shared/ui/ErrorMessage';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerRequest, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const res = await registerRequest({ name, email, password }).unwrap();
      dispatch(login({ name: res.user.name, email: res.user.email, token: res.token }));
      navigate('/swipe');
    } catch (err: any) {
      setError(err.data?.message || 'Error al registrarse. Verifica los datos ingresados.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Registro
      </Typography>
      
      {error && <ErrorMessage message={error} />}
      
      <TextField 
        fullWidth 
        margin="normal" 
        label="Nombre completo" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        required
        disabled={isLoading}
      />
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
        {isLoading ? 'Registrando...' : 'Registrarse'}
      </Button>
    </Box>
  );
};

export default RegisterForm; 