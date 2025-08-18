import { Navigate } from "react-router-dom";
import { TokenValidator } from "../utils/TokenValidator";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/login" />;
    return children;
}

export default ProtectedRoute;