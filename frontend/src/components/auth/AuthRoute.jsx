import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../customHooks/useAuthContext";

const AuthRoute = ({path, element}) => {
    const { user } = useAuthContext();
    return user ? (path === "/login" || path === "/register" ? <Navigate to="/"/> : element) : (path === "/login" || path === "/register") ? element : <Navigate to="/login" />;
}
 
export default AuthRoute;