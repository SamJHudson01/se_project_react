import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ element: Component, loggedIn, ...rest }) {
  return loggedIn ? (
    <Route {...rest} element={Component} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoute;
