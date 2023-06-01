import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../customHooks/useAuthContext";
import { useCartContext } from "../../customHooks/useCartContext";

const CheckoutRoute = ({path, element}) => {
    const { user } = useAuthContext();
    const { cart } = useCartContext()
    if (!user) {
        return <Navigate to="/login"/>
    }
    if (cart.length <= 0) {
        return <Navigate to="/checkout/summary"/>
    }
    return element

    
}
 
export default CheckoutRoute;