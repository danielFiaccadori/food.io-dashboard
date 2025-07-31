import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
    const token = localStorage.getItem("token");

    if (token && token !== "null" && token !== "undefined" && token.trim() !== "") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default PublicRoute;