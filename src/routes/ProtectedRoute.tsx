import React, { type JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token'); // ✅ updated key

  if (!token) return <Navigate to="/login" replace />;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const roles: string[] = payload.roles?.map((r: any) => r.roleName) || [];

    if (allowedRoles && !roles.some(role => allowedRoles.includes(role))) {
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (err) {
    console.error('Invalid token:', err);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
