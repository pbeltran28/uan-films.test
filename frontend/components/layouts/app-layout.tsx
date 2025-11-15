"use client";

import { useAuthStore } from "@/store/auth.store";
import { logout } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const user = useAuthStore((state) => state.user);
  const authLogout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Obtener iniciales del nombre
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      authLogout();
      toast.success("Sesión cerrada exitosamente");
      router.replace("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Aún así, cerrar sesión localmente
      authLogout();
      router.replace("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Toolbar */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Nombre de la app */}
            <div className="flex items-center">
              <Link
                href="/"
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  UANFilms
                </h1>
              </Link>
            </div>

            {/* Información del usuario y botón de logout */}
            <div className="flex items-center gap-4">
              {/* Información del usuario */}
              <div className="flex items-center gap-3">
                {/* Avatar o iniciales */}
                {user?.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-700"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center border-2 border-slate-700">
                    <span className="text-white font-semibold text-sm">
                      {user ? getInitials(user.name) : "U"}
                    </span>
                  </div>
                )}

                {/* Nombre del usuario */}
                <div className="hidden sm:block">
                  <p className="text-white font-medium text-sm">
                    {user?.name || "Usuario"}
                  </p>
                </div>
              </div>

              {/* Botón de logout */}
              <Button
                onClick={handleLogout}
                disabled={isLoggingOut}
                variant="outline"
                size="sm"
                className="bg-slate-800/50 border-slate-700 text-gray-300 hover:bg-slate-700 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900/60 backdrop-blur-xl border-t border-slate-800/50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} UANFilms. Todos los derechos
              reservados.
            </p>
            <p className="font-medium">UANFilms</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
