# Frontend - Sistema de Fidelización

Aplicación web desarrollada con Astro que proporciona la interfaz de usuario para el sistema de fidelización de comercios PyME.

## Tabla de Contenidos

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Configuración del .env](#configuración-del-env)
  - [Backend con Docker (Sail)](#backend-con-docker-sail)
  - [Backend con XAMPP](#backend-con-xampp)
- [Scripts Disponibles](#scripts-disponibles)
- [Tecnologías](#tecnologías)

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── api/                # Servicios y llamadas a la API
│   ├── components/         # Componentes reutilizables
│   ├── config/             # Configuraciones de la aplicación
│   ├── features/           # Funcionalidades por módulo
│   ├── hooks/              # Custom hooks de React
│   ├── layouts/            # Layouts de páginas
│   ├── lib/                # Utilidades y helpers
│   ├── pages/              # Páginas de la aplicación
│   ├── store/              # Estado global (store)
│   ├── styles/             # Estilos globales
│   ├── types/              # Tipos TypeScript
│   ├── env.d.ts            # Definiciones de tipos para .env
│   └── middleware.ts       # Middleware de Astro
├── public/                 # Archivos estáticos
├── astro.config.mjs        # Configuración de Astro
├── tailwind.config.mjs     # Configuración de Tailwind CSS
├── tsconfig.json           # Configuración de TypeScript
└── package.json            # Dependencias y scripts
```

## Instalación y Configuración

**Requisitos:**

- Node.js 18.x o superior
- npm, pnpm o yarn

**Pasos:**

1. Navegar a la carpeta frontend:

```bash
cd frontend
```

2. Instalar las dependencias:

```bash
npm install
# o
pnpm install
# o
yarn install
```

3. Crear el archivo de variables de entorno:

```bash
cp .env.example .env
```

4. Configurar las variables de entorno según como se levanto el backend (ver sección [Configuración del .env](#configuración-del-env))

5. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:4321`

## Configuración del .env

El archivo `.env` debe configurarse según cómo hayas levantado el backend:

### Backend con Docker (Sail)

Si levantaste el backend usando Docker con Laravel Sail, configura las variables de la siguiente manera:

```env
# URL de la API del backend (puerto por defecto de Sail)
PUBLIC_API_URL=http://localhost/api

# O si Sail está configurado en otro puerto
# PUBLIC_API_URL=http://localhost:80/api
```

**Nota:** Laravel Sail por defecto expone la aplicación en el puerto 80 (http://localhost).

### Backend con XAMPP

Si levantaste el backend usando XAMPP, configura las variables de la siguiente manera:

```env
# URL de la API del backend (puerto por defecto de php artisan serve)
PUBLIC_API_URL=http://localhost:8000/api
```

**Nota:** El comando `php artisan serve` levanta el servidor en el puerto 8000 por defecto.

## Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Compilar para producción
npm run preview      # Previsualizar build de producción
npm run astro        # Ejecutar comandos de Astro CLI
```

## Tecnologías

- **Astro** - Framework web moderno
- **TypeScript** - Tipado estático
- **React** - Componentes interactivos
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI reutilizables
- **nanostores** - Gestión de estado (si aplica)
- **React Hook Form** - Manejo de formularios (si aplica)
