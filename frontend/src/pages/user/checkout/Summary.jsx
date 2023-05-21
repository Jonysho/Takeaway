import CheckoutStages from "../../../components/CheckoutStages";

const Summary = () => {
    return ( 
        <div className="h-96">
            <CheckoutStages stage={1}/>
            <div className="p-4">
                <div className="mb-5">
                    <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl lg:mx-4 text-center text-green-600 drop-shadow-sm">Summary</h1>
                    <ul>
                        
                    </ul>
                </div>
            </div>
        </div>
     );
}
 
export default Summary;