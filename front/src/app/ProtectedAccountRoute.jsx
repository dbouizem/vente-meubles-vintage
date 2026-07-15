import { Navigate, Outlet } from 'react-router-dom';
function ProtectedAccountRoute() {
  return localStorage.getItem('authToken') ? <Outlet /> : <Navigate to="/" replace />;
}
export default ProtectedAccountRoute;
