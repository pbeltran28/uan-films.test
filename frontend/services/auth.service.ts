import api from "@/lib/axios";
import { User } from "@/types/gloabal";

// callback-url
export const getGoogleAuthUrl = () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL ??
    "http://localhost:8000/auth/google/redirect";
  return `${baseUrl}?callback-url=${window.location.origin}/oauth-callback`;
};

/**
 * Iniciar sesión del usuario
 */
export const login = async (payload: {
  email: string;
  password: string;
  remember: boolean;
}) => {
  const { status, data } = (await api
    .post("/auth/login", payload)
    .catch((e) => e?.response)) ?? { data: {} };

  const responseData = data?.data ?? {};

  return {
    isSuccess: status === 200,
    user: responseData.user as User,
    token: responseData.token as string,
    message: data?.message as string | undefined,
    errors: data?.errors as Record<string, string> | undefined,
  };
};

/**
 * Registrar un nuevo usuario
 */
export const register = async (payload: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  const { status, data } = (await api
    .post("/auth/register", payload)
    .catch((e) => e?.response)) ?? { data: {} };

  const responseData = data?.data ?? {};

  return {
    isSuccess: status === 201,
    status: status,
    user: responseData.user as User,
    token: responseData.token as string,
    message: data?.message as string | undefined,
    errors: data?.errors as Record<string, string> | undefined,
  };
};

/**
 * Cerrar sesión del usuario
 */
export const logout = async () => {
  const { status, data } = (await api
    .post("/auth/logout")
    .catch((e) => e?.response)) ?? { data: {} };

  return {
    isSuccess: status === 200,
    message: data?.message as string | undefined,
  };
};

/**
 * Obtener información del usuario autenticado
 */
export const me = async () => {
  const { status, data } = (await api
    .get("/auth/me")
    .catch((e) => e?.response)) ?? { data: {} };

  return {
    isSuccess: status === 200,
    user: data?.data?.user as User,
    message: data?.message,
  };
};
