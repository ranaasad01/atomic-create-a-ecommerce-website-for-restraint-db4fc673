"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { User } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setUser({ id: "u1", name: email.split("@")[0], email });
    setIsLoading(false);
    return true;
  }, []);

  const register = useCallback(
    async (name: string, email: string, _password: string): Promise<boolean> => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      setUser({ id: "u1", name, email });
      setIsLoading(false);
      return true;
    },
    []
  );

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}