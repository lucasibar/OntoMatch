import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';
import { useRegisterMutation } from './authApi';
import ErrorMessage from '../../shared/ui/ErrorMessage';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [bio, setBio] = useState('');
  const [lookingFor, setLookingFor] = useState('pareja');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerRequest, { isLoading }] = useRegisterMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfilePhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const res = await registerRequest({ 
        name, 
        email, 
        password, 
        profilePhoto, 
        bio, 
        lookingFor 
      }).unwrap();
      dispatch(login({ 
        id: res.user.id,
        name: res.user.name, 
        email: res.user.email, 
        token: res.token 
      }));
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
      
      <Box sx={{ mt: 2, mb: 1 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="profile-photo-input"
          type="file"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        <label htmlFor="profile-photo-input">
          <Button variant="outlined" component="span" fullWidth disabled={isLoading}>
            {profilePhoto ? 'Foto seleccionada ✓' : 'Seleccionar foto de perfil'}
          </Button>
        </label>
      </Box>
      
      <TextField 
        fullWidth 
        margin="normal" 
        label="Descripción personal" 
        multiline
        rows={3}
        value={bio} 
        onChange={e => setBio(e.target.value)} 
        placeholder="Cuéntanos sobre ti..."
        disabled={isLoading}
        helperText="Opcional: Mínimo 10 caracteres"
      />
      
      <FormControl fullWidth margin="normal" disabled={isLoading}>
        <InputLabel>¿Qué buscas?</InputLabel>
        <Select
          value={lookingFor}
          label="¿Qué buscas?"
          onChange={e => setLookingFor(e.target.value)}
          required
        >
          <MenuItem value="pareja">Pareja</MenuItem>
        </Select>
      </FormControl>
      
      <Button type="submit" variant="contained" fullWidth disabled={isLoading} sx={{ mt: 3 }}>
        {isLoading ? 'Registrando...' : 'Registrarse'}
      </Button>
    </Box>
  );
};

export default RegisterForm; 