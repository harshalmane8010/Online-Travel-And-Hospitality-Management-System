import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    
  } from 'react';
  import type { ReactNode } from 'react';

  import { useNavigate } from 'react-router-dom';
  
  interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  interface AuthProviderProps {
    children: ReactNode;
  }
  
  export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }, []);
  
    const login = (token: string) => {
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user-email');
      localStorage.removeItem('user-role');
      setIsLoggedIn(false);
      navigate('/'); // Optional: redirect to home or login
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  