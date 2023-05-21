import CheckoutStages from "../../../components/CheckoutStages";

const CheckoutDetails = () => {
    return ( 
        <div className="h-96">
            <CheckoutStages stage={2}/>
            <div className="p-4">
                <div className="mb-5">
                    <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl lg:mx-4 text-center text-green-600 drop-shadow-sm">Confirm Details</h1>
                </div>
            </div>
        </div>
    );
}
 
export default CheckoutDetails;