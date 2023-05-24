import { useEffect } from "react";
import CheckoutStages from "../../../components/CheckoutStages";
import { useCartContext } from "../../../customHooks/useCartContext";
import { useAuthContext } from "../../../customHooks/useAuthContext";

const Summary = () => {
    const { cart } = useCartContext()
    const {user} = useAuthContext()

    return ( 
        <div className="h-96">
            <CheckoutStages stage={1}/>
            <div className="p-4">
                <div className="mb-5">
                    <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl lg:mx-4 text-center text-green-600 drop-shadow-sm">Summary</h1>
                    <ul>
                        {cart && cart.map(item => (
                            <li key={item.itemId}>
                                <h1 className="font-bold text-lg">{item.name}</h1>
                                <ul>
                                {item.portions.map(portion => (
                                    <li key={portion.size}>
                                        <label>Portion: {portion.size} £{portion.price} x{portion.quantity}</label>
                                    </li>
                                ))}
                                </ul>
                                <label>Total: {item.amount}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
     );
}
 
export default Summary;