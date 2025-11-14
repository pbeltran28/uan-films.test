"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de autenticación pendiente
  };

  const handleGoogleLogin = () => {
    // Lógica de autenticación con Google pendiente
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            UANFilms
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Inicia sesión en tu cuenta
          </p>
        </div>

        {/* Formulario de login */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-800/50 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
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
              <Label htmlFor="password" className="text-gray-300 text-sm font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="pl-10 bg-slate-950/50 border-slate-700/50 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/30 h-11 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Recordar sesión */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={handleRememberChange}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-950/50 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-400 cursor-pointer select-none"
                >
                  Recordar sesión
                </label>
              </div>
            </div>

            {/* Botón de login */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold h-11 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              Iniciar Sesión
            </Button>

            {/* Divisor */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-500 bg-slate-900/60">
                  o continúa con
                </span>
              </div>
            </div>

            {/* Botón de Google */}
            <Button
              type="button"
              onClick={handleGoogleLogin}
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
              Iniciar sesión con Google
            </Button>
          </form>

          {/* Enlaces adicionales */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              ¿No tienes cuenta?{" "}
              <Link
                href="/create-account"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
              >
                Crear cuenta
              </Link>
            </p>
          </div>
        </div>

        {/* Footer con información adicional */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            Al iniciar sesión, aceptas nuestros{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              Política de Privacidad
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}