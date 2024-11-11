import { Navigate } from "react-router-dom";
import { role } from "../utils/testData";

const ProtectedRoute = ({ children, requiredRole }) => {
  if (role !== requiredRole) return <Navigate to="/home" />;

  return children;
};

export default ProtectedRoute;
