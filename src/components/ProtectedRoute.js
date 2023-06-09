import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, loggedIn }) {
  let navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return loggedIn ? children : null;
}

export default ProtectedRoute;
