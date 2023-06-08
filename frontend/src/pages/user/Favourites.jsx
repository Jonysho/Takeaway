import { useEffect, useState } from "react";
import { deleteFavouriteApi, getUserFavouritesApi } from "../../api/userApi";
import { useAuthContext } from "../../customHooks/useAuthContext";
import { loadFavouriteApi } from "../../api/cartApi";
import { useCartContext } from "../../customHooks/useCartContext";

const Favourites = () => {
    const { user } = useAuthContext()
    const { cart, dispatch } = useCartContext()
    // Get favourite orders for current user from MongoDB
    const [favourites, setFavourites] = useState([])

    const fetchFavourites = async () => {
        try {
            const response = await getUserFavouritesApi(user.id, user.token)
            if (response) {
                const favourites = response.data.favourites
                console.log(favourites)
                setFavourites(favourites)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchFavourites()
    }, [])

    const handleLoad = async (favCartId) => {
        try {
            const response = await loadFavouriteApi(user.id, favCartId, user.token)
            if (response) {
                console.log(response)
                let cart = response.data.cart
                console.log(cart)
                dispatch({type: "SET_CART", payload: cart})
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (cartId) => {
        try {
            const response = await deleteFavouriteApi(user.id, cartId, user.token)
            if (response){
                console.log(response)
                fetchFavourites()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Get recent orders for current user from MongoDB
    const [recents, setRecents] = useState([])

    return (
        <div className="w-full text-center">
            {favourites.length > 0 ?
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
                    {favourites.map((fav, index) => (
                        <div key={index}>
                            <div className="p-3 bg-gray-200 rounded-sm max-w-[16rem] relative">
                                <h1 className="font-bold mb-2">{fav.name ? fav.name : `Favourite #${index + 1}`}</h1>
                                { fav.cart.map( item => (
                                    <ul key={item._id}>
                                        { item.portions.map(p => (
                                            <li key={p.size}>
                                                {`${item.name} (${p.size}) x${p.quantity}`}
                                            </li>
                                        ))}
                                    </ul>
                                ))}
                                <div className="flex flex-col mx-auto max-w-[8rem]">
                                    <button className="bg-blue-600 hover:bg-blue-700 rounded-full px-4 py-1 text-white mt-2 shadow-md active:bg-blue-500"
                                        onClick={() => handleLoad(fav._id)}>Load to Cart</button>
                                    <button className="bg-red-600 hover:bg-red-700 active:bg-red-500 rounded-full px-4 py-1 text-white mt-2 shadow-md" 
                                        onClick={() => handleDelete(fav._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            : 
            <div className="w-full">
                <p className="pb-2 font-bold">There are currently no saved favourite orders.</p>
                <p className="text-sm lg:text-base p-2">You can name and favourite your orders prior to ordering for quicker ordering next time.</p>
            </div>
            }
            <div>
                <span>
                    <h1 className="redline flex justify-center items-center font-bold text-2xl sm:text-3xl lg:text-4xl lg:mx-4 text-center text-green-600 drop-shadow-sm p-6 line">Recent Orders</h1>
                </span>
                <p className="pb-2 font-bold">There are currently no recent orders.</p>
                <p className="text-sm p-2">Your recent orders will appear here for quicker ordering next time.</p>
            </div>
        </div>
    )
}
 
export default Favourites;