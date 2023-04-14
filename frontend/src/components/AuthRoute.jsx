import { Navigate } from "react-router-dom";
import { useAuthContext } from "../customHooks/useAuthContext";

const AuthRoute = ({path, element, redirectPath}) => {
    const { user } = useAuthContext();
    return user ? (path === "/login" || path === "/register" ? <Navigate to="/"/> : element) : (path === "/login" || path === "/register") ? element : <Navigate to={redirectPath} />;
}
 
export default AuthRoute;