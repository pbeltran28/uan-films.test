"use client";

import { setAuthToken } from "@/lib/axios";
import { me } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function OauthCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const token = searchParams.get("token");
  const error = searchParams.get("error");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      // Si hay un error en la URL, mostrarlo
      if (error) {
        setErrorMessage(error);
        setIsLoading(false);
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          router.replace("/login");
        }, 3000);
        return;
      }

      // Si no hay token, redirigir al login
      if (!token) {
        setErrorMessage("No se recibió un token de autenticación");
        setIsLoading(false);
        setTimeout(() => {
          router.replace("/login");
        }, 3000);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage(null);

        // Configurar el token en axios
        setAuthToken(token);

        // Validar el token obteniendo la información del usuario
        const result = await me();

        if (result.isSuccess && result.user) {
          // Loguear al usuario con el método del store
          login(result.user, token);

          // Redirigir a la página de inicio
          router.replace("/");
        } else {
          setErrorMessage(result.message || "Error al validar el token");
          setIsLoading(false);
          setTimeout(() => {
            router.replace("/login");
          }, 3000);
        }
      } catch (err) {
        console.error("Error al validar token:", err);
        setErrorMessage(
          "Error al validar el token. Por favor, intenta de nuevo."
        );
        setIsLoading(false);
        setTimeout(() => {
          router.replace("/login");
        }, 3000);
      }
    };

    validateToken();
  }, [token, error, login, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="text-center">
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Validando autenticación...</p>
          </>
        ) : errorMessage ? (
          <>
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-red-500 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
            <p className="text-red-400 mb-4">{errorMessage}</p>
            <p className="text-gray-400 text-sm">Redirigiendo al login...</p>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default function OauthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Cargando...</p>
          </div>
        </div>
      }
    >
      <OauthCallbackContent />
    </Suspense>
  );
}
