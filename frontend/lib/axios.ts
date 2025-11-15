import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});

/**
 * Establece el token de autenticación en el encabezado de la petición.
 */
export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

/**
 * Elimina el token de autenticación del encabezado de la petición.
 */
export const removeAuthToken = () => {
  delete api.defaults.headers.common["Authorization"];
};

export default api;
