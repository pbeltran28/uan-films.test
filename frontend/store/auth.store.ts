import { removeAuthToken, setAuthToken } from "@/lib/axios";
import { deleteCookie, getCookie, setCookie } from "@/lib/cookie";
import { User } from "@/types/gloabal";
import { create } from "zustand";

const AUTH_COOKIE_NAME = "auth_token";
const AUTH_USER_KEY = "auth_user";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user: User, token: string) => {
    set({ user, token, isAuthenticated: true });
    setCookie(AUTH_COOKIE_NAME, token, 30);
    setAuthToken(token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  },
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    deleteCookie(AUTH_COOKIE_NAME);
    localStorage.removeItem(AUTH_USER_KEY);
    removeAuthToken();
  },
  checkAuth: () => {
    const token = getCookie(AUTH_COOKIE_NAME);
    if (token) {
      set({ isAuthenticated: true });
      setAuthToken(token);
      const user = localStorage.getItem(AUTH_USER_KEY);
      if (user) {
        set({ user: JSON.parse(user) });
      }
    }
  },
}));
