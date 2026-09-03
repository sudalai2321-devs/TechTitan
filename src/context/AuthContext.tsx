import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Student {
  registerNo: string;
  name: string;
  department: string;
  year: string;
  email: string;
}

interface AuthContextType {
  user: Student | null;
  login: (user: Student) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Student | null>(null);

  useEffect(() => {
    // Check local storage for session on mount
    const storedUser = localStorage.getItem('techTitansUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (studentData: Student) => {
    setUser(studentData);
    localStorage.setItem('techTitansUser', JSON.stringify(studentData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('techTitansUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
