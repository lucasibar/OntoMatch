# OntoMatch

Una aplicación de citas moderna construida con React, TypeScript y Material-UI.

## 🚀 Tecnologías

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Redux Toolkit** - Gestión de estado
- **React Router** - Enrutamiento
- **Material-UI (MUI)** - Componentes de UI
- **Emotion** - CSS-in-JS

## 📁 Estructura del Proyecto

```
src/
│
├── app/              # Configuración global (Redux store, routing, Theme, App root)
│   ├── App.tsx       # Componente raíz con rutas
│   └── store.ts      # Configuración de Redux store
│
├── pages/            # Vistas por ruta (Login, Register, Home, Swipe)
│   ├── Home.tsx      # Página principal
│   ├── Login.tsx     # Página de login
│   ├── Register.tsx  # Página de registro
│   └── Swipe.tsx     # Página de matching
│
├── shared/           # Componentes reutilizables y utilidades globales
│   ├── ui/           # Botones, inputs, etc.
│   │   ├── Button.tsx
│   │   └── index.ts
│   └── utils/        # Helpers generales (validadores, formateadores, etc.)
│       └── index.ts
│
├── features/         # Casos de uso específicos, con lógica + componentes propios
│   ├── auth/         # Login, Register, recuperación, etc.
│   │   ├── authSlice.ts
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── index.ts
│   ├── match/        # Swipe, perfiles, lógica de like
│   │   ├── matchSlice.ts
│   │   ├── SwipeList.tsx
│   │   └── index.ts
│   ├── chat/         # Inbox, WebSocket, mensajes
│   └── index.ts
│
├── entities/         # Modelos de dominio (User, Message, Match, etc.)
│   ├── user/
│   ├── message/
│   ├── match/
│   └── index.ts
│
└── index.tsx         # Punto de entrada
```

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd OntoMatch
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 🎯 Características

- **Arquitectura Feature-Sliced Design** - Organización modular del código
- **TypeScript** - Tipado estático para mayor seguridad
- **Material-UI** - Componentes de UI modernos y accesibles
- **Redux Toolkit** - Gestión de estado eficiente
- **React Router** - Navegación SPA
- **Path Mapping** - Importaciones limpias con alias

## 🔧 Configuración

### Backend Connection
El proyecto está configurado para conectarse al backend NestJS en `http://localhost:3000`:

```typescript
// Endpoints disponibles
POST /auth/register - Registro de usuarios
POST /auth/login - Inicio de sesión
```

### Path Mapping
El proyecto incluye alias de importación para una mejor organización:

```typescript
import { Button } from '@shared/ui/Button';
import { useAuth } from '@features/auth';
import { User } from '@entities/user';
```

### TypeScript
Configurado con strict mode y path mapping para una mejor experiencia de desarrollo.

### Persistencia de Sesión
La aplicación mantiene la sesión del usuario en localStorage, por lo que al recargar la página el usuario permanece autenticado.

## 📱 Funcionalidades Implementadas

- [x] Autenticación de usuarios (Login/Registro)
- [x] Conexión al backend NestJS con RTK Query
- [x] Persistencia de sesión con localStorage
- [x] Rutas protegidas con redirección automática
- [x] Sistema de matching con perfiles de coaches
- [x] Navegación entre páginas
- [x] Gestión de estado con Redux Toolkit
- [x] UI moderna con Material-UI
- [x] Manejo de errores elegante

## 🚧 Funcionalidades Planificadas

- [ ] Chat en tiempo real
- [ ] Swipe interactivo (like/dislike)
- [ ] Perfiles de usuario detallados
- [ ] Geolocalización
- [ ] Notificaciones push
- [ ] Filtros de búsqueda

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
