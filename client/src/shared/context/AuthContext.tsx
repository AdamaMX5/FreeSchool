// React binding around the framework-agnostic session store (replaces the Svelte user store).
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { SessionUser } from "../types";
import { getSession, subscribe, clearSession } from "../services/session";
import {
  checkEmail,
  login as apiLogin,
  registerComplete,
  logout as apiLogout,
  applySession,
  ensureValidToken,
} from "../services/authApi";

interface AuthContextValue {
  user: SessionUser;
  isLoggedIn: boolean;
  isModerator: boolean;
  checkEmail: (email: string) => Promise<"login" | "register">;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, repassword: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser>(getSession());

  // Mirror the session store into React state.
  useEffect(() => subscribe(() => setUser(getSession())), []);
  // Silent refresh on mount (restores the session via the HttpOnly cookie).
  useEffect(() => {
    ensureValidToken().catch(() => {});
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoggedIn: !!user.accessToken,
      isModerator: user.roles.includes("MODERATOR"),
      checkEmail,
      login: async (email, password) => {
        applySession(await apiLogin(email, password));
      },
      register: async (email, password, repassword) => {
        applySession(await registerComplete(email, password, repassword));
      },
      logout: async () => {
        await apiLogout();
        clearSession();
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
