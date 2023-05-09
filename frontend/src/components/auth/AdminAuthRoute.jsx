import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../customHooks/useAuthContext";

const AdminAuthRoute = ({element}) => {
    const { user } = useAuthContext();
    if (!user) {
        return <Navigate to="/login"/>
    }
    return user.isAdmin ? element : <Navigate to="/"/>
}
 
export default AdminAuthRoute;