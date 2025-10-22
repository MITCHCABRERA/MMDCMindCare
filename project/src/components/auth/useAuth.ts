import React from "react";

export interface User {
  email: string;
  name: string;
  password?: string; 
  role?: "student" | "doctor" | "admin";
  photoURL?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);

  function login(userData: User) {
    setUser(userData);
  }

  function logout() {
    setUser(null);
  }

  return React.createElement(
    AuthContext.Provider,
    { value: { user, login, logout } },
    children
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
