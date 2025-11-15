# Backend - UANFilms

API REST de UANFilms construida con Laravel 12 y PHP 8.2+.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
composer install

# Configurar entorno
cp .env.example .env
php artisan key:generate

# Crear base de datos SQLite
touch database/database.sqlite

# Ejecutar migraciones
php artisan migrate

# Ejecutar servidor de desarrollo
php artisan serve
```

La API estará disponible en `http://localhost:8000`

## 📋 Requisitos

- PHP 8.2+
- Composer
- SQLite (por defecto) o MySQL/PostgreSQL

## ⚙️ Configuración

Configura las variables en `.env`:

```env
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite
DB_DATABASE=/ruta/absoluta/a/database/database.sqlite

# OAuth Google
GOOGLE_CLIENT_ID=tu-client-id
GOOGLE_CLIENT_SECRET=tu-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/oauth-callback

# The Movie Database
MOVIE_DB_API_URL=https://api.themoviedb.org/3
MOVIE_DB_ACCESS_TOKEN=tu-access-token
```

## 🛠️ Tecnologías

- **Laravel 12**: Framework PHP
- **PHP 8.2+**: Lenguaje de programación
- **Laravel Sanctum**: Autenticación API
- **Laravel Socialite**: OAuth (Google)
- **Eloquent ORM**: ORM para base de datos
- **SQLite/MySQL/PostgreSQL**: Base de datos

## 📁 Estructura

```
backend/
├── app/
│   ├── Http/Controllers/  # Controladores de la API
│   ├── Models/            # Modelos Eloquent
│   ├── Policies/          # Políticas de autorización
│   └── Console/Commands/  # Comandos Artisan
├── database/
│   ├── migrations/        # Migraciones
│   └── seeders/          # Seeders
└── routes/
    └── api.php           # Rutas de la API
```

## 🔧 Comandos Útiles

```bash
# Ejecutar todo (servidor, cola, logs, vite)
composer run dev

# Ejecutar migraciones
php artisan migrate

# Sincronizar películas desde TMDB
php artisan app:sync-movie-db

# Ejecutar tests
php artisan test

# Formatear código
./vendor/bin/pint
```

## 🔌 Endpoints Principales

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registro
- `GET /api/auth/me` - Usuario actual
- `GET /api/movies` - Listar películas
- `GET /api/movies/{slug}` - Detalle de película
- `POST /api/movies/{movie}/reviews` - Crear reseña

## 🔐 Autenticación

La API utiliza Laravel Sanctum para autenticación basada en tokens. Incluye las cabeceras:

```
Authorization: Bearer {token}
```

