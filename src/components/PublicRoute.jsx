import { Navigate } from "react-router-dom";
import { TokenValidator } from "../utils/TokenValidator";

function PublicRoute({ children }) {
    const token = localStorage.getItem("token");

/*     if (TokenValidator(token)) {
        return <Navigate to="/dashboard/home" replace />;
    } */

    return children;
}

export default PublicRoute;