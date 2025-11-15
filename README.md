# 🎬 UANFilms

**UANFilms** es una plataforma web moderna para la gestión y exploración de películas, donde los usuarios pueden buscar, calificar y dejar reseñas sobre sus películas favoritas. La aplicación está construida con una arquitectura de 3 capas (3-tier) separando el frontend, backend y base de datos.

## 📋 Descripción del Proyecto

UANFilms es una aplicación web desarrollada para una empresa de producción cinematográfica que permite a los usuarios:

- **Autenticación de usuarios**: Registro, inicio de sesión y autenticación OAuth con Google
- **Catálogo de películas**: Explorar un catálogo completo de películas con información detallada
- **Búsqueda y filtrado**: Buscar películas por título, género, año y director
- **Reseñas y calificaciones**: Escribir reseñas y calificar películas (escala 1-5)
- **Gestión de películas**: Agregar nuevas películas al sistema
- **Estadísticas personales**: Ver resumen de reseñas escritas, calificación promedio y género favorito
- **Sincronización con TMDB**: Integración con The Movie Database para obtener información actualizada de películas

## 🛠️ Tecnologías Utilizadas

### Backend

#### **Laravel 12**

Framework PHP moderno y robusto que proporciona:

- Arquitectura MVC (Modelo-Vista-Controlador)
- Sistema de rutas RESTful
- ORM Eloquent para interacciones con la base de datos
- Sistema de migraciones y seeders
- Middleware para autenticación y autorización
- Validación de datos con Form Requests
- Sistema de colas para tareas asíncronas

#### **PHP 8.2+**

- Tipado estricto (`declare(strict_types=1)`)
- Características modernas de PHP (typed properties, match expressions)
- Mejoras de rendimiento significativas

#### **Laravel Sanctum 4.0**

- Autenticación basada en tokens para APIs
- Protección CSRF
- Gestión de sesiones para aplicaciones SPA

#### **Laravel Socialite 5.23**

- Integración OAuth con proveedores externos (Google)
- Autenticación social simplificada

#### **Base de Datos**

- **SQLite** (por defecto): Base de datos ligera y fácil de configurar para desarrollo
- Soporte para **MySQL/MariaDB** y **PostgreSQL** mediante configuración
- Migraciones para gestión de esquema
- Seeders para datos iniciales

#### **Herramientas de Desarrollo**

- **Laravel Pint**: Formateador de código PSR-12
- **PHPUnit 11.5**: Framework de testing
- **Laravel Pail**: Visualización de logs en tiempo real
- **Laravel Sail**: Entorno Docker para desarrollo

### Frontend

#### **Next.js 16**

Framework React de producción con:

- App Router (nuevo sistema de enrutamiento)
- Server Components y Client Components
- Optimización automática de imágenes y assets
- Code splitting automático
- SEO mejorado

#### **React 19**

- Biblioteca de UI declarativa
- Hooks modernos para gestión de estado y efectos
- Componentes funcionales con TypeScript

#### **TypeScript 5**

- Tipado estático para mayor seguridad en el código
- Autocompletado y detección de errores en tiempo de desarrollo
- Mejor experiencia de desarrollo

#### **Tailwind CSS 4**

- Framework CSS utility-first
- Diseño responsive por defecto
- Sistema de temas personalizable
- Optimización de producción automática

#### **Zustand 5.0**

- Librería de gestión de estado ligera y moderna
- API simple y directa
- Mejor rendimiento que Redux para casos de uso simples

#### **Axios 1.13**

- Cliente HTTP para peticiones a la API
- Interceptores para manejo de tokens y errores
- Soporte para cancelación de peticiones

#### **Zod 4.1**

- Validación de esquemas TypeScript-first
- Validación de formularios en el cliente
- Type inference automático

#### **Radix UI**

- Componentes de UI accesibles y sin estilos
- Componentes utilizados:
  - `@radix-ui/react-label`
  - `@radix-ui/react-slot`

#### **Librerías Adicionales**

- **Lucide React**: Iconos modernos y ligeros
- **Sonner**: Notificaciones toast elegantes
- **next-themes**: Gestión de temas (claro/oscuro)
- **class-variance-authority**: Utilidades para variantes de componentes
- **clsx** y **tailwind-merge**: Utilidades para clases CSS condicionales

## 📁 Estructura del Proyecto

```
uan-films.test/
├── backend/                 # Aplicación Laravel
│   ├── app/
│   │   ├── Console/
│   │   │   └── Commands/    # Comandos Artisan personalizados
│   │   ├── Http/
│   │   │   ├── Controllers/ # Controladores de la API
│   │   │   └── Requests/    # Form Requests para validación
│   │   ├── Models/          # Modelos Eloquent
│   │   └── Policies/        # Políticas de autorización
│   ├── database/
│   │   ├── migrations/      # Migraciones de base de datos
│   │   ├── seeders/         # Seeders para datos iniciales
│   │   └── factories/       # Factories para testing
│   ├── routes/
│   │   └── api.php          # Rutas de la API
│   └── config/              # Archivos de configuración
│
└── frontend/                # Aplicación Next.js
    ├── app/                 # App Router de Next.js
    │   ├── page.tsx         # Página principal
    │   ├── login/           # Página de login
    │   ├── create-account/  # Página de registro
    │   ├── movie/           # Páginas de películas
    │   └── oauth-callback/  # Callback de OAuth
    ├── components/          # Componentes React reutilizables
    ├── services/           # Servicios para comunicación con API
    ├── store/              # Estado global con Zustand
    ├── hooks/              # Custom hooks de React
    ├── lib/                # Utilidades y configuraciones
    ├── types/              # Definiciones de tipos TypeScript
    └── schemas/            # Esquemas de validación Zod
```

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **PHP 8.2 o superior**
- **Composer** (gestor de dependencias de PHP)
- **Node.js 18+** y **npm** (o yarn/pnpm)
- **SQLite** (incluido en la mayoría de sistemas) o MySQL/PostgreSQL
- **Git**

## 📦 Instalación

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd uan-films.test
```

### 2. Configurar el Backend

```bash
cd backend

# Instalar dependencias de PHP
composer install

# Copiar archivo de entorno
cp .env.example .env

# Generar clave de aplicación
php artisan key:generate

# Crear base de datos SQLite (si no existe)
touch database/database.sqlite
```

### 3. Configurar Variables de Entorno del Backend

Edita el archivo `.env` en la carpeta `backend/` y configura:

```env
APP_NAME=UANFilms
APP_ENV=local
APP_KEY=  # Se genera automáticamente con key:generate
APP_DEBUG=true
APP_URL=http://localhost:8000

# Base de datos (SQLite por defecto)
DB_CONNECTION=sqlite
DB_DATABASE=/ruta/absoluta/a/database/database.sqlite

# O si prefieres MySQL/PostgreSQL:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=uan_films
# DB_USERNAME=root
# DB_PASSWORD=

# Autenticación OAuth con Google
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/oauth-callback

# The Movie Database API (para sincronización)
MOVIE_DB_API_URL=https://api.themoviedb.org/3
MOVIE_DB_ACCESS_TOKEN=tu-tmdb-access-token
```

### 4. Ejecutar Migraciones y Seeders

```bash
# Ejecutar migraciones
php artisan migrate

# (Opcional) Ejecutar seeders para datos iniciales
php artisan db:seed
```

### 5. Sincronizar Películas desde TMDB (Opcional)

```bash
# Sincronizar películas desde The Movie Database
php artisan app:sync-movie-db
```

### 6. Configurar el Frontend

```bash
cd ../frontend

# Instalar dependencias de Node.js
npm install
```

### 7. Configurar Variables de Entorno del Frontend

Crea un archivo `.env.local` en la carpeta `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🏃 Ejecución en Entorno de Desarrollo

### Opción 1: Ejecutar Backend y Frontend por Separado

**Terminal 1 - Backend:**

```bash
cd backend
php artisan serve
```

El backend estará disponible en `http://localhost:8000`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

### Opción 2: Ejecutar Todo con el Script de Laravel (Backend)

El backend incluye un script que ejecuta múltiples servicios simultáneamente:

```bash
cd backend
composer run dev
```

Este comando ejecuta:

- Servidor Laravel (`php artisan serve`)
- Cola de trabajos (`php artisan queue:listen`)
- Logs en tiempo real (`php artisan pail`)
- Compilación de assets con Vite (`npm run dev`)

**Nota:** El frontend aún debe ejecutarse por separado en otra terminal.

## 🔧 Comandos Útiles

### Backend

```bash
# Ejecutar migraciones
php artisan migrate

# Ejecutar migraciones con seeders
php artisan migrate --seed

# Crear un nuevo controlador
php artisan make:controller NombreController

# Crear un nuevo modelo con migración
php artisan make:model NombreModel -m

# Ejecutar tests
php artisan test

# Limpiar caché
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Sincronizar películas desde TMDB
php artisan app:sync-movie-db

# Formatear código (Laravel Pint)
./vendor/bin/pint
```

### Frontend

```bash
# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar versión de producción
npm start

# Ejecutar linter
npm run lint
```

## 🔐 Autenticación

La aplicación soporta dos métodos de autenticación:

1. **Autenticación tradicional**: Registro e inicio de sesión con email y contraseña
2. **OAuth con Google**: Autenticación mediante Google usando Laravel Socialite

Para configurar OAuth con Google:

1. Crea un proyecto en [Google Cloud Console](https://console.cloud.google.com/)
2. Habilita la API de Google+
3. Crea credenciales OAuth 2.0
4. Configura las URLs de redirección
5. Agrega las credenciales al archivo `.env` del backend

## 📊 Base de Datos

### Modelos Principales

- **Users**: Usuarios del sistema
- **Movies**: Películas en el catálogo
- **Reviews**: Reseñas de los usuarios
- **Genres**: Géneros cinematográficos

### Relaciones

- Un usuario puede tener muchas reseñas
- Una película puede tener muchas reseñas
- Una película pertenece a un género
- Una reseña pertenece a un usuario y una película

## 🎨 Características de la UI

- **Tema oscuro**: Diseño moderno con tonos azul oscuro y acentos vibrantes
- **Responsive**: Adaptado para dispositivos móviles y de escritorio
- **Componentes accesibles**: Uso de Radix UI para componentes accesibles
- **Animaciones suaves**: Transiciones y efectos visuales con Tailwind CSS
- **Feedback visual**: Notificaciones toast para acciones del usuario

## 🧪 Testing

```bash
# Ejecutar tests del backend
cd backend
php artisan test

# Ejecutar tests con cobertura
php artisan test --coverage
```

## 📝 Notas Adicionales

- El proyecto utiliza **SQLite por defecto** para facilitar el desarrollo, pero puede configurarse para usar MySQL o PostgreSQL
- Las películas se pueden sincronizar desde The Movie Database (TMDB) usando el comando `app:sync-movie-db`
- El backend expone una API RESTful que el frontend consume mediante Axios
- La autenticación se maneja mediante tokens de Laravel Sanctum
- El proyecto sigue las convenciones de Laravel y las mejores prácticas de Next.js

## 🤝 Contribución

Este proyecto fue desarrollado como parte de un proyecto académico. Para contribuir:

1. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
2. Realiza tus cambios y commits descriptivos
3. Envía un Pull Request con una descripción clara de los cambios

## 📄 Licencia

Este proyecto es de uso educativo/académico.

---

**Desarrollado con ❤️ usando Laravel y Next.js**
