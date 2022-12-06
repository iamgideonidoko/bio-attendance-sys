import { useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import useStore from '../store/store';
import { useNavigate } from 'react-router-dom';

const AuthLayout: FC<{ children: ReactNode; routeType: 'auth' | 'noauth' }> = ({ children, routeType }) => {
  const isAuthenticated = useStore.use.isAuthenticated();
  const navigate = useNavigate();

  /**
   * noauth routes are the login and register pages
   * auth routes are authenticated routes like staff profile
   * */
  useEffect(() => {
    if (!isAuthenticated && routeType === 'auth') {
      navigate('/staff/login');
    } else if (isAuthenticated && routeType === 'noauth') {
      navigate('/staff/profile');
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default AuthLayout;
