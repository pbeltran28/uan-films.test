<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'UANFilms - Dashboard')</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-slate-dark min-h-screen">
    <!-- Toolbar / Navigation -->
    <nav class="bg-navy border-b border-gray-700 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex items-center">
                    <a href="{{ route('home') }}" class="text-2xl font-bold text-electric-blue hover:text-blue-400 transition-colors duration-200">
                        UANFilms
                    </a>
                </div>

                <!-- User Menu -->
                <div class="flex items-center space-x-4">
                    @auth
                        <!-- User Profile -->
                        <div class="flex items-center space-x-3">
                            @if(auth()->user()->profile_image)
                                <img src="{{ auth()->user()->profile_image }}" 
                                     alt="{{ auth()->user()->name }}" 
                                     class="h-8 w-8 rounded-full border-2 border-electric-blue">
                            @else
                                <div class="h-8 w-8 rounded-full bg-gradient-to-r from-electric-blue to-blue-500 flex items-center justify-center text-white font-semibold">
                                    {{ substr(auth()->user()->name, 0, 1) }}
                                </div>
                            @endif
                            <span class="text-gray-300 font-medium hidden sm:block">
                                {{ auth()->user()->name }}
                            </span>
                        </div>

                        <!-- Logout Button -->
                        <form method="POST" action="{{ route('auth.logout') }}" class="inline">
                            @csrf
                            <button type="submit" 
                                    class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                                Cerrar Sesión
                            </button>
                        </form>
                    @else
                        <a href="{{ route('auth.login') }}" 
                           class="text-gray-300 hover:text-white transition-colors duration-200">
                            Iniciar Sesión
                        </a>
                        <a href="{{ route('auth.register') }}" 
                           class="bg-gradient-to-r from-electric-blue to-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                            Registrarse
                        </a>
                    @endauth
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="py-8">
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="bg-navy border-t border-gray-700 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="text-center text-gray-400 text-sm">
                <p>&copy; {{ date('Y') }} UANFilms. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    @stack('scripts')
</body>
</html>

