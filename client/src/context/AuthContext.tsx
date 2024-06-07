import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextProps {
  token: string | null;
  user: string | null;
  access: number[];
  setAuthInfo: (token: string, user: string, access: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [access, setAccess] = useState<number[]>(
    localStorage.getItem("access")?.split(",").map(Number) || []
  );

  const setAuthInfo = (token: string, user: string, access: string) => {
    const access_arr = access.split(",").map(Number);
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    localStorage.setItem("access", access);
    setToken(token);
    setUser(user);
    setAccess(access_arr);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUser(localStorage.getItem("user"));
    setAccess(localStorage.getItem("access")?.split(",").map(Number) || []);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, access, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
