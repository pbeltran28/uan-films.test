<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Cuenta - UANFilms</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-slate-dark min-h-screen flex items-center justify-center py-8">
    <div class="w-full max-w-md">
        <!-- Logo y título -->
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-electric-blue mb-2">UANFilms</h1>
            <p class="text-gray-300 text-lg">Crea tu cuenta y únete a la comunidad</p>
        </div>

        <!-- Formulario de registro -->
        <div class="bg-navy rounded-2xl shadow-2xl p-8 border border-gray-700">
            <form method="POST" action="{{ route('auth.register.post') }}" class="space-y-6">
                @csrf
                
                <!-- Nombre -->
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
                        Nombre Completo
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value="{{ old('name') }}"
                        class="w-full px-4 py-3 bg-slate-dark border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all duration-200"
                        placeholder="Tu nombre completo"
                        required
                    >
                    @error('name')
                        <p class="mt-2 text-sm text-red-400">{{ $message }}</p>
                    @enderror
                </div>

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
                    <div class="relative">
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            class="w-full px-4 py-3 bg-slate-dark border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all duration-200"
                            placeholder="••••••••"
                            required
                        >
                        <button 
                            type="button" 
                            onclick="togglePassword('password')"
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-electric-blue transition-colors duration-200"
                        >
                            <svg id="eye-password" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        </button>
                    </div>
                    @error('password')
                        <p class="mt-2 text-sm text-red-400">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Confirmar Contraseña -->
                <div>
                    <label for="password_confirmation" class="block text-sm font-medium text-gray-300 mb-2">
                        Confirmar Contraseña
                    </label>
                    <div class="relative">
                        <input 
                            type="password" 
                            id="password_confirmation" 
                            name="password_confirmation" 
                            class="w-full px-4 py-3 bg-slate-dark border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all duration-200"
                            placeholder="••••••••"
                            required
                        >
                        <button 
                            type="button" 
                            onclick="togglePassword('password_confirmation')"
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-electric-blue transition-colors duration-200"
                        >
                            <svg id="eye-password_confirmation" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Indicador de fortaleza de contraseña -->
                <div id="password-strength" class="hidden">
                    <div class="text-sm text-gray-400 mb-2">Fortaleza de la contraseña:</div>
                    <div class="flex space-x-1">
                        <div class="h-2 bg-gray-600 rounded flex-1"></div>
                        <div class="h-2 bg-gray-600 rounded flex-1"></div>
                        <div class="h-2 bg-gray-600 rounded flex-1"></div>
                        <div class="h-2 bg-gray-600 rounded flex-1"></div>
                    </div>
                    <div id="strength-text" class="text-xs mt-1"></div>
                </div>

                <!-- Botón de registro -->
                <button 
                    type="submit" 
                    class="w-full bg-gradient-to-r from-electric-blue to-blue-500 hover:from-blue-500 hover:to-electric-blue text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-slate-dark"
                >
                    Crear Cuenta
                </button>
            </form>

            <!-- Enlaces adicionales -->
            <div class="mt-6 text-center">
                <p class="text-gray-400 text-sm">
                    ¿Ya tienes cuenta? 
                    <a href="{{ route('auth.login') }}" class="text-electric-blue hover:text-blue-400 font-medium transition-colors duration-200">
                        Iniciar sesión
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
        // Función para mostrar/ocultar contraseña
        function togglePassword(fieldId) {
            const field = document.getElementById(fieldId);
            const eye = document.getElementById('eye-' + fieldId);
            
            if (field.type === 'password') {
                field.type = 'text';
                eye.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                `;
            } else {
                field.type = 'password';
                eye.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                `;
            }
        }

        // Validación de fortaleza de contraseña
        function checkPasswordStrength(password) {
            let strength = 0;
            let feedback = '';

            if (password.length >= 6) strength++;
            if (password.match(/[a-z]/)) strength++;
            if (password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[^a-zA-Z0-9]/)) strength++;

            const strengthDiv = document.getElementById('password-strength');
            const strengthBars = strengthDiv.querySelectorAll('.h-2');
            const strengthText = document.getElementById('strength-text');

            if (password.length > 0) {
                strengthDiv.classList.remove('hidden');
                
                strengthBars.forEach((bar, index) => {
                    bar.classList.remove('bg-red-500', 'bg-yellow-500', 'bg-green-500');
                    if (index < strength) {
                        if (strength <= 2) {
                            bar.classList.add('bg-red-500');
                            feedback = 'Débil';
                        } else if (strength <= 3) {
                            bar.classList.add('bg-yellow-500');
                            feedback = 'Media';
                        } else {
                            bar.classList.add('bg-green-500');
                            feedback = 'Fuerte';
                        }
                    }
                });
                
                strengthText.textContent = feedback;
            } else {
                strengthDiv.classList.add('hidden');
            }
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.querySelector('form');
            form.style.opacity = '0';
            form.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                form.style.transition = 'all 0.6s ease-out';
                form.style.opacity = '1';
                form.style.transform = 'translateY(0)';
            }, 100);

            // Validación en tiempo real
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('password_confirmation');

            passwordInput.addEventListener('input', function() {
                checkPasswordStrength(this.value);
                
                if (this.value.length >= 6) {
                    this.classList.remove('border-red-500');
                    this.classList.add('border-green-500');
                } else {
                    this.classList.remove('border-green-500');
                    this.classList.add('border-red-500');
                }
            });

            confirmPasswordInput.addEventListener('input', function() {
                const password = passwordInput.value;
                if (this.value === password && password.length > 0) {
                    this.classList.remove('border-red-500');
                    this.classList.add('border-green-500');
                } else if (this.value.length > 0) {
                    this.classList.remove('border-green-500');
                    this.classList.add('border-red-500');
                }
            });

            const emailInput = document.getElementById('email');
            emailInput.addEventListener('input', function() {
                if (this.value.includes('@')) {
                    this.classList.remove('border-red-500');
                    this.classList.add('border-green-500');
                } else {
                    this.classList.remove('border-green-500');
                    this.classList.add('border-red-500');
                }
            });
        });
    </script>
</body>
</html>
