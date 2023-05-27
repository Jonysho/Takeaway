import { useEffect, useState } from "react";
import CheckoutStages from "../../../components/CheckoutStages";
import { useCartContext } from "../../../customHooks/useCartContext";
import { useAuthContext } from "../../../customHooks/useAuthContext";
import { AiFillHeart, AiFillShop } from "react-icons/ai";
import {RiAddFill, RiSubtractFill}  from 'react-icons/ri';
import { addToCartApi, removeFromCartApi } from "../../../api/cartApi";

const Summary = () => {
    const { cart, total, dispatch } = useCartContext()
    const {user} = useAuthContext()
    const [estimatedTime, setEstimatedTime] = useState(25)
    const [count, setCount] = useState(0)

    useEffect(() => {
        let temp = 0
        if (cart) {
            console.log(cart)
            for (let i = 0; i < cart.length; i ++){
                for (let j = 0; j < cart[i].portions.length; j ++) {
                    temp += cart[i].portions[j].quantity
                }
            }
            setCount(temp)
        }
    }, [cart])

    const handleChange = async (change, itemId, size) => {
        console.log(itemId, size)
        try {
            let response
            if (change === "remove") {
                console.log("a")
                response = await removeFromCartApi(user.id, itemId, size, user.token)
            } else if (change === "add") {
                console.log("b")
                response = await addToCartApi(user.id, itemId, size, user.token)
            }
            let { cart } = response.data
            dispatch({type: "SET_CART", payload: cart})
        } catch (error) {
            console.log(error)
        }   
    }

    const handleFavourite = () => {

    }

    const handleCheckout = () => {

    }

    return ( 
        <div>
            <CheckoutStages stage={1}/>
            <div className="p-4">
                <div className="mb-5 max-w-4xl mx-auto">
                    <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl lg:mx-4 text-center text-green-600 drop-shadow-sm mb-6">Summary</h1>
                    {
                        cart && (
                        <div>
                            <span className="flex my-2 bg-gray-200 rounded-lg px-2 py-1 w-56 mx-auto justify-evenly items-center"> <AiFillShop size={20}/> Collect In: {`${estimatedTime - 5} - ${estimatedTime + 5} Mins`}</span>
                            <h3 className="my-5 text-center">You have {count} {count === 1 ? 'item' : 'items'} on a collection order.</h3>
                            <div className="md:text-lg">
                            {cart.map(item => (
                                <div key={item.itemId} className="p-4 bg-slate-200 mb-6"> 
                                    <div className="font-semibold mb-1 text-lg md:text-xl flex justify-between mx-2">
                                        <div>{item.name}</div>
                                        Total: £{item.amount.toFixed(2)}
                                    </div>   
                                    <div className="flex bg-white items-center shadow-md">
                                        <div className="h-24 w-24">
                                        <img src={`https://storage.googleapis.com/item-images-bucket/${item.image}`}
                                            alt={item.name} className="w-full h-full object-cover"/>
                                        </div>
                                        <div className="flex-col w-full p-3">
                                                {item.portions.map(portion => (
                                                <div key={portion.size} className="flex justify-between my-1 flex-wrap">
                                                    <div>
                                                        {portion.size}<label> x{portion.quantity}</label>
                                                    </div>
                                                    <div className="flex items-center"> 
                                                        <div className="flex ml-1 mr-3">
                                                            <div className="border border-r-0 border-black cursor-pointer bg-red-500 hover:bg-red-600" 
                                                                onClick={() => handleChange("remove", item.itemId, portion.size)}>
                                                                <RiSubtractFill size={21}/> 
                                                            </div>
                                                            <div className="border border-black cursor-pointer bg-green-400 hover:bg-green-500" 
                                                                onClick={() => handleChange("add", item.itemId, portion.size)}>
                                                                <RiAddFill size={21}/> 
                                                            </div>
                                                        </div>
                                                        £{portion.price.toFixed(2)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                            <div className="bg-gray-200 flex justify-between p-4 items-center mb-4">
                                <p className="font-bold mr-6 ">Grand Total:</p>
                                <p className="font-bold text-3xl">£{total}</p>
                            </div>  
                            <div className="bg-gray-200 flex flex-col justify-between p-4 items-center mb-4 text-center">
                                <h1 className="font-bold text-3xl text-green-600 drop-shadow-sm mb-1">Add to Favourite Basket</h1>
                                <p className="mb-4">You can save your basket for a faster checkout next time</p>
                                <button className="rounded-full p-2 px-3 bg-red-500 w-fit flex justify-center text-white shadow-sm hover:bg-red-600 font-semibold"
                                    onClick={handleFavourite}>
                                    Save Basket
                                </button>
                            </div>
                            <div className="flex justify-end">
                                <button className="rounded-full p-2 px-3 bg-green-600 w-fit flex justify-center text-white shadow-sm hover:bg-green-700 font-semibold"
                                    onClick={handleCheckout}>
                                    Checkout Now
                                </button>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
     );
}
 
export default Summary;