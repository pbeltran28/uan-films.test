# Frontend - UANFilms

Aplicación frontend de UANFilms construida con Next.js 16, React 19 y TypeScript.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar versión de producción
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 📋 Requisitos

- Node.js 18+
- npm, yarn o pnpm

## ⚙️ Configuración

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🛠️ Tecnologías

- **Next.js 16**: Framework React con App Router
- **React 19**: Biblioteca de UI
- **TypeScript**: Tipado estático
- **Tailwind CSS 4**: Framework CSS utility-first
- **Zustand**: Gestión de estado
- **Axios**: Cliente HTTP
- **Zod**: Validación de esquemas
- **Radix UI**: Componentes accesibles
- **Lucide React**: Iconos

## 📁 Estructura

```
frontend/
├── app/              # Páginas y rutas (App Router)
├── components/       # Componentes React reutilizables
├── services/         # Servicios para comunicación con API
├── store/           # Estado global (Zustand)
├── hooks/           # Custom hooks
├── lib/             # Utilidades y configuraciones
├── types/           # Definiciones TypeScript
└── schemas/         # Esquemas de validación Zod
```

## 🎨 Características

- Tema oscuro con diseño moderno
- Diseño responsive
- Autenticación con tokens
- Validación de formularios con Zod
- Notificaciones toast
- Componentes accesibles

