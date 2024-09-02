import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const AuthChecker = ({ children }) => {
  const { isAuthenticated, role } = useAuthStore();

  // Redirect to the appropriate dashboard based on role
  if (isAuthenticated && role === 'user') {
    return <Navigate to="/user-dashboard" />;
  }

  // If not authenticated or no matching role, render children or fallback
  return children ? children : <Outlet />;
};

export default AuthChecker;