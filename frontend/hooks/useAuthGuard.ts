import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

/**
 * Hook para proteger rutas que requieren autenticación
 * Redirige a /login si el usuario no está autenticado
 */
export function useAuthGuard() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Verificar autenticación desde cookies/localStorage
    checkAuth();

    // Usar un pequeño delay para permitir que el estado se actualice
    const timer = setTimeout(() => {
      const currentAuth = useAuthStore.getState().isAuthenticated;
      if (!currentAuth) {
        router.replace("/login");
      } else {
        // Usar setTimeout para evitar setState síncrono en efecto
        setTimeout(() => setIsChecking(false), 0);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [router, checkAuth]);

  // Verificar cuando cambie el estado de autenticación
  useEffect(() => {
    if (isChecking && isAuthenticated) {
      // Usar setTimeout para evitar setState síncrono en efecto
      setTimeout(() => setIsChecking(false), 0);
    } else if (!isChecking && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isChecking, router]);

  return { isChecking, isAuthenticated };
}

/**
 * Hook para proteger rutas de autenticación (login, registro)
 * Redirige a / si el usuario ya está autenticado
 */
export function useGuestGuard() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Verificar autenticación desde cookies/localStorage
    checkAuth();

    // Usar un pequeño delay para permitir que el estado se actualice
    const timer = setTimeout(() => {
      const currentAuth = useAuthStore.getState().isAuthenticated;
      if (currentAuth) {
        router.replace("/");
      } else {
        // Usar setTimeout para evitar setState síncrono en efecto
        setTimeout(() => setIsChecking(false), 0);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [router, checkAuth]);

  // Verificar cuando cambie el estado de autenticación
  useEffect(() => {
    if (isChecking && !isAuthenticated) {
      // Usar setTimeout para evitar setState síncrono en efecto
      setTimeout(() => setIsChecking(false), 0);
    } else if (!isChecking && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isChecking, router]);

  return { isChecking, isAuthenticated };
}
