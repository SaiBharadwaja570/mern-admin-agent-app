import { Navigate } from "react-router-dom";

// rivate Roue for better navigation

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
