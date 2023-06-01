const CheckoutStages = ({stage}) => {
    return (
        <div className="bg-gray-200 h-12 text-center sm:h-14  top-[3.0rem] sm:top-[4.5rem] lg:top-[4.4rem] z-[700] shadow-lg sticky flex justify-center items-center text-lg font-semibold">
            <h3 className={`mx-1 ${stage === 1 && 'text-red-600'} ${stage < 1 && 'opacity-30'}`}>1. Summary</h3> 
            <span className="opacity-30">{'>'}</span>
            <h3 className={`mx-1 ${stage === 2 && 'text-red-600'} ${stage < 2 && 'opacity-30'}`}>2. Checkout</h3>
            <span className="opacity-30">{'>'}</span>
            <h3 className={`mx-1 ${stage === 3 && 'text-red-600'} ${stage < 3 && 'opacity-30'}`}>3. Confirmation</h3>
        </div>
     );
}
 
export default CheckoutStages;