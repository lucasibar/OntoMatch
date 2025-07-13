import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface SignInButtonProps extends Omit<ButtonProps, 'onClick'> {
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
}

const SignInButton: React.FC<SignInButtonProps> = ({ 
  children = 'Iniciar Sesión',
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  ...props 
}) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      onClick={handleSignIn}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SignInButton; 