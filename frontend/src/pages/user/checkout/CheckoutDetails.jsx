import { useEffect, useState } from "react";
import CheckoutStages from "../../../components/CheckoutStages";
import { useDetails } from "../../../customHooks/useDetails";
import { useAuthContext } from "../../../customHooks/useAuthContext";
import { FaCcPaypal, FaGooglePay } from "react-icons/fa";
import { AiFillCreditCard } from "react-icons/ai";
import { BsCashStack } from "react-icons/bs";
import { GrPaypal } from "react-icons/gr";
import { useCartContext } from "../../../customHooks/useCartContext";
import { useNavigate } from "react-router-dom";

const CheckoutDetails = () => {
    const { user } = useAuthContext()
    const { total } = useCartContext()
    const {userInfo, getDetails} = useDetails()
    const [estimatedTime, setEstimatedTime] = useState(25)
    const [noti, setNoti] = useState(5)
    const [paymentMethod, setPaymentMethod] = useState('')

    useEffect(() => {
        if (user){
            getDetails(user.id, user.token)
        }
    }, [user])  

    const handlePaymentUpdate = (e) => {
        setPaymentMethod(e.target.value)
    }
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/checkout/summary");
    }

    const handleGooglePay = () => {
        // Google Pay
        navigate("/checkout/confirmation");
    }

    const handlePay = () => {
        // Card Pay if card
        navigate("/checkout/confirmation");
    }

    return ( 
        <div >
            <CheckoutStages stage={2}/>
            <div className="p-4 w-full text-sm">
                <div className="mb-5">
                    <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl lg:mx-4 text-center text-green-600 drop-shadow-sm">Confirm Details</h1>
                </div>
                <div className="flex flex-col items-center max-w-md mx-auto px-4">
                    <div className="w-full flex flex-col mb-4">
                        <label className="mb-1 font-semibold">First Name</label>
                        <input disabled={true} className="border border-gray-700/20 text-black/70 p-2 rounded-sm opacity bg-gray-100" value={userInfo.firstname}/>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        <label className="mb-1 font-semibold">Contact Number</label>
                        <input disabled={true} className="border border-gray-700/20 text-black/70 p-2 rounded-sm opacity bg-gray-100" value={userInfo.phone}/>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        <label className="mb-1 font-semibold">Email</label>
                        <input disabled={true} className="border border-gray-700/20 text-black/70 p-2 rounded-sm opacity bg-gray-100" value={userInfo.email}/>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        <label className="mb-1 font-semibold">Collection Time</label>
                        <div disabled={true} className="border border-gray-700/20 text-black/70 p-2 rounded-sm opacity bg-gray-100 w-fit">
                            {`${estimatedTime - 5}-${estimatedTime + 5} mins`}
                        </div>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        <label className="mb-1 font-semibold">Receive Notifcation</label>
                        <p className="mb-2">{noti != 0 ? `You will receive a notifcation ${noti} minutes before your order is ready to collect.` 
                            : "You will not receive any notification."}
                        </p>
                        <select name="notification" className="border border-gray-700/70 p-2 rounded-sm opacity shadow-md w-fit cursor-pointer" value={noti}
                            onChange={(e) => setNoti(e.target.value)}>
                            <option value={0}>Do not send</option>
                            <option value={5}>5 minutes</option>
                            <option value={10}>10 minutes</option>
                            <option value={15}>15 minutes</option>
                            <option value={20}>20 minutes</option>
                        </select>
                    </div>
                    <div className="w-full flex flex-col mb-3">
                        <label className="mb-1 font-semibold">Payment Method</label>
                        <button className={`border border-gray-400 mb-3 p-2 rounded-sm opacity flex items-center text-center shadow-sm 
                            ${paymentMethod === "gpay" && 'bg-blue-300/30 border-x-4 border-x-blue-500'}`}
                            value="gpay"
                            onClick={handlePaymentUpdate}>
                            <div className="border border-black px-2 mr-2 rounded-sm shadow-sm bg-white">   
                                <FaGooglePay size={25}/> 
                            </div>
                            Google Pay
                        </button>
                        <button className={`border border-gray-400 mb-3 p-2 rounded-sm opacity flex items-center text-center shadow-sm 
                            ${paymentMethod === "paypal" && 'bg-blue-300/30 border-x-4 border-x-blue-500'}`}
                            value="paypal"
                            onClick={handlePaymentUpdate}>
                            <div className="px-2 mr-2 rounded-sm shadow-sm">   
                                <GrPaypal size={25}/> 
                            </div>
                            Paypal
                        </button>
                        <button className={`border border-gray-400 mb-3 p-2 rounded-sm opacity flex items-center text-center shadow-sm 
                            ${paymentMethod === "card" && 'bg-blue-300/30 border-x-4 border-x-blue-500'}`}
                            value="card"
                            onClick={handlePaymentUpdate}>
                            <div className="px-2 mr-2 rounded-sm shadow-sm">   
                                <AiFillCreditCard size={25}/> 
                            </div>
                            Card (Visa, Mastercard, Amex)
                        </button>
                        <button className={`border border-gray-400 mb-3 p-2 rounded-sm opacity flex items-center text-center shadow-sm 
                            ${paymentMethod === "cash" && 'bg-blue-300/30 border-x-4 border-x-blue-500'}`}
                            value="cash"
                            onClick={handlePaymentUpdate}>
                            <div className="px-2 mr-2 rounded-sm shadow-sm">   
                                <BsCashStack size={25}/> 
                            </div>
                            Cash
                        </button>
                    </div>
                    <div className="bg-gray-200/90 flex justify-between p-3 items-center mb-4 border-y border-gray-300 w-full">
                        <p className="font-bold mr-6 ">Grand Total:</p>
                        <p className="font-bold text-3xl">£{total}</p>
                    </div>
                    <div className="flex w-full justify-between">
                        <button className="rounded-full p-2 px-3 bg-red-600 w-fit flex justify-center text-white shadow-sm hover:bg-red-700 font-semibold" 
                            onClick={handleBack}>Back</button>
                        { paymentMethod === 'gpay' ? 
                            <button onClick={handleGooglePay}>Pay</button> :
                            <button className="rounded-full p-2 px-3 bg-green-600 w-fit flex justify-center text-white shadow-sm hover:bg-green-700 font-semibold"
                            onClick={handlePay}>Place Order and Pay</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CheckoutDetails;