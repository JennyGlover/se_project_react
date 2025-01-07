import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthenticationContext } from '../contexts/AppContexts';

function ProtectedRoute({ children, anonymous = false }) {
  // Using useLocation to access route information
  const location = useLocation();
  const from = location.state?.from || '/';

  // Destructuring context values
  const { isLoggedIn } = useContext(AuthenticationContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  //  If user is not logged in and route is not anonymous, redirect to "/"
  if (!isLoggedIn && !anonymous) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // 3. If the user is logged in or the route is anonymous, render children
  return children;
}

export default ProtectedRoute;
