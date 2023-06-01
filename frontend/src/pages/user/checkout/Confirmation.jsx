import { useState } from "react";
import CheckoutStages from "../../../components/CheckoutStages";

const Confirmation = () => {
    const [orderNumber, setOrderNumber] = useState(12345)

    return ( 
        <div className="h-96">
            <CheckoutStages stage={3}/>
            <div className="p-4">
                <div className="mb-5">
                    <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl lg:mx-4 text-center text-green-600 drop-shadow-sm">Confirmation</h1>
                    <h2>Order Number: {orderNumber}</h2>
                </div>
            </div>
        </div>
     );
}
 
export default Confirmation;