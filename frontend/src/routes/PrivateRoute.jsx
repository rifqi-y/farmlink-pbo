import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const PrivateRoute = ({ children, role }) => {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/login" />;
  if (role && user.role?.name !== role) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
