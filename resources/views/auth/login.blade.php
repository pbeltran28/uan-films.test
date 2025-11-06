<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - UANFilms</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'dark-blue': '#1a1a2e',
                        'electric-blue': '#00d4ff',
                        'navy': '#16213e',
                        'slate-dark': '#0f172a'
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-slate-dark min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md">
        <!-- Logo y título -->
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-electric-blue mb-2">UANFilms</h1>
            <p class="text-gray-300 text-lg">Inicia sesión en tu cuenta</p>
        </div>

        <!-- Formulario de login -->
        <div class="bg-navy rounded-2xl shadow-2xl p-8 border border-gray-700">
            <form method="POST" action="{{ route('auth.login') }}" class="space-y-6">
                @csrf
                
                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                        Correo Electrónico
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value="{{ old('email') }}"
                        class="w-full px-4 py-3 bg-slate-dark border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all duration-200"
                        placeholder="tu@email.com"
                        required
                    >
                    @error('email')
                        <p class="mt-2 text-sm text-red-400">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Contraseña -->
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
                        Contraseña
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        class="w-full px-4 py-3 bg-slate-dark border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all duration-200"
                        placeholder="••••••••"
                        required
                    >
                    @error('password')
                        <p class="mt-2 text-sm text-red-400">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Recordar sesión -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input 
                            type="checkbox" 
                            id="remember" 
                            name="remember" 
                            class="h-4 w-4 text-electric-blue focus:ring-electric-blue border-gray-600 rounded bg-slate-dark"
                        >
                        <label for="remember" class="ml-2 text-sm text-gray-300">
                            Recordar sesión
                        </label>
                    </div>
                </div>

                <!-- Botón de login -->
                <button 
                    type="submit" 
                    class="w-full bg-gradient-to-r from-electric-blue to-blue-500 hover:from-blue-500 hover:to-electric-blue text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-slate-dark"
                >
                    Iniciar Sesión
                </button>
            </form>

            <!-- Enlaces adicionales -->
            <div class="mt-6 text-center">
                <p class="text-gray-400 text-sm">
                    ¿No tienes cuenta? 
                    <a href="{{ route('auth.register') }}" class="text-electric-blue hover:text-blue-400 font-medium transition-colors duration-200">
                        Crear cuenta
                    </a>
                </p>
            </div>
        </div>

        <!-- Mensajes de éxito/error -->
        @if (session('success'))
            <div class="mt-4 bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-lg">
                {{ session('success') }}
            </div>
        @endif

        @if (session('error'))
            <div class="mt-4 bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
                {{ session('error') }}
            </div>
        @endif
    </div>

    <!-- Scripts adicionales para interactividad -->
    <script>
        // Animación suave al cargar la página
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.querySelector('form');
            form.style.opacity = '0';
            form.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                form.style.transition = 'all 0.6s ease-out';
                form.style.opacity = '1';
                form.style.transform = 'translateY(0)';
            }, 100);
        });

        // Validación en tiempo real
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        emailInput.addEventListener('input', function() {
            if (this.value.includes('@')) {
                this.classList.remove('border-red-500');
                this.classList.add('border-green-500');
            } else {
                this.classList.remove('border-green-500');
                this.classList.add('border-red-500');
            }
        });

        passwordInput.addEventListener('input', function() {
            if (this.value.length >= 6) {
                this.classList.remove('border-red-500');
                this.classList.add('border-green-500');
            } else {
                this.classList.remove('border-green-500');
                this.classList.add('border-red-500');
            }
        });
    </script>
</body>
</html>
