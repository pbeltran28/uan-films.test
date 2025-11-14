"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function CreateAccountPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  // Calcular la fortaleza de la contraseña
  const getPasswordStrength = () => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength();

  const getPasswordStrengthText = () => {
    if (password.length === 0) return "";
    if (passwordStrength <= 2) return "Débil";
    if (passwordStrength <= 3) return "Media";
    return "Fuerte";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de registro pendiente
  };

  const handleGoogleSignup = () => {
    // Lógica de registro con Google pendiente
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmationVisibility = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            UANFilms
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Crea tu cuenta y únete a la comunidad
          </p>
        </div>

        {/* Formulario de registro */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-800/50 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre Completo */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300 text-sm font-medium">
                Nombre Completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Tu nombre completo"
                  className="pl-10 bg-slate-950/50 border-slate-700/50 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/30 h-11 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 text-sm font-medium">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="tu@email.com"
                  className="pl-10 bg-slate-950/50 border-slate-700/50 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/30 h-11 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-gray-300 text-sm font-medium"
              >
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-slate-950/50 border-slate-700/50 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/30 h-11 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-2">
              <Label
                htmlFor="password_confirmation"
                className="text-gray-300 text-sm font-medium"
              >
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type={showPasswordConfirmation ? "text" : "password"}
                  id="password_confirmation"
                  value={passwordConfirmation}
                  onChange={handlePasswordConfirmationChange}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-slate-950/50 border-slate-700/50 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/30 h-11 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordConfirmationVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400 transition-colors duration-200"
                >
                  {showPasswordConfirmation ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Indicador de fortaleza de contraseña */}
            {password.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm text-gray-400">
                  Fortaleza de la contraseña:
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-2 rounded flex-1 transition-colors duration-300 ${
                        level <= passwordStrength
                          ? getPasswordStrengthColor()
                          : "bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
                <div
                  className={`text-xs font-medium ${
                    passwordStrength <= 2
                      ? "text-red-400"
                      : passwordStrength <= 3
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {getPasswordStrengthText()}
                </div>
              </div>
            )}

            {/* Validación de coincidencia de contraseñas */}
            {passwordConfirmation.length > 0 && (
              <div className="text-xs">
                {password === passwordConfirmation ? (
                  <p className="text-green-400 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                    Las contraseñas coinciden
                  </p>
                ) : (
                  <p className="text-red-400 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-400"></span>
                    Las contraseñas no coinciden
                  </p>
                )}
              </div>
            )}

            {/* Botón de registro */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold h-11 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              Crear Cuenta
            </Button>

            {/* Divisor */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-500 bg-slate-900/60">
                  o regístrate con
                </span>
              </div>
            </div>

            {/* Botón de Google */}
            <Button
              type="button"
              onClick={handleGoogleSignup}
              variant="outline"
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold h-11 rounded-lg transition-all duration-300 transform hover:scale-[1.02] border-2 border-gray-200 hover:border-gray-300 shadow-md"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
              Registrarse con Google
            </Button>
          </form>

          {/* Enlaces adicionales */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
              >
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>

        {/* Footer con información adicional */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            Al crear una cuenta, aceptas nuestros{" "}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Política de Privacidad
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}