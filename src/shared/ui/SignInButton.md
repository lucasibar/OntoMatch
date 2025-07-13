# SignInButton Component

## Descripción
El componente `SignInButton` es un botón reutilizable que navega automáticamente a la página de login cuando se hace clic en él.

## Uso Básico

```tsx
import { SignInButton } from '../shared/ui';

// Uso básico
<SignInButton />

// Con texto personalizado
<SignInButton>Iniciar Sesión</SignInButton>

// Con variantes de estilo
<SignInButton variant="outlined" color="primary" size="large">
  Comenzar Ahora
</SignInButton>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | `'Iniciar Sesión'` | Texto del botón |
| `variant` | `'text' \| 'outlined' \| 'contained'` | `'contained'` | Estilo del botón |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamaño del botón |
| `color` | `'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning' \| 'inherit'` | `'primary'` | Color del botón |
| `...props` | `ButtonProps` | - | Todas las props adicionales de Material-UI Button |

## Ejemplos

### Botón Principal
```tsx
<SignInButton 
  size="large" 
  variant="contained" 
  color="primary"
>
  Comenzar Ahora
</SignInButton>
```

### Botón Secundario
```tsx
<SignInButton 
  variant="outlined" 
  color="secondary"
>
  Ya tengo cuenta
</SignInButton>
```

### Botón en Header
```tsx
<SignInButton 
  variant="outlined" 
  color="inherit"
  size="small"
/>
```

## Comportamiento
- Al hacer clic, navega automáticamente a `/login`
- Utiliza React Router para la navegación
- Es compatible con Material-UI Button
- Soporta todas las props de Material-UI Button excepto `onClick` 