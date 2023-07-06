import { useEffect, useState } from "react";
import { deleteFavouriteApi, getUserFavouritesApi } from "../../api/userApi";
import { useAuthContext } from "../../customHooks/useAuthContext";
import { loadFavouriteApi } from "../../api/cartApi";
import { useCartContext } from "../../customHooks/useCartContext";
import { AiOutlineRight } from "react-icons/ai";
import FavouriteDetails from "../../components/Modal/FavouriteModal";
import ModalBase from "../../components/Modal/ModalBase";
import { Navigate } from "react-router-dom";

const Favourites = () => {
    const { user } = useAuthContext()
    const { cart, dispatch } = useCartContext()
    // Get favourite orders for current user from MongoDB
    const [favourites, setFavourites] = useState([])

    const [isModalOpen, setModalOpen] = useState(false);
    const [currFav, setCurrFav] = useState({});

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const fetchFavourites = async () => {
        try {
            const response = await getUserFavouritesApi(user.id, user.token)
            if (response) {
                const favourites = response.data.favourites
                setFavourites(favourites)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchFavourites()
    }, [])

    const handleLoad = async (cartId) => {
        try {
            const response = await loadFavouriteApi(user.id, cartId, user.token)
            if (response) {
                closeModal();
                console.log(response)
                let cart = response.data.cart
                console.log(cart)
                dispatch({type: "SET_CART", payload: cart});
                <Navigate to="/"/>;
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemove = async (cartId) => {
        console.log("remove")
        const confirmed = window.confirm('Are you sure you want to remove this basket?');
        if (!confirmed) return
        closeModal()
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

    if (favourites.length <= 0) return (
        <div className="w-full flex-1 text-center">
            <p className="pb-2 font-bold">There are currently no saved favourite orders.</p>
            <p className="text-sm lg:text-base p-2">You can name and favourite your orders prior to ordering for quicker ordering next time.</p>
        </div>
    )

    return (
        <div className="flex-1 w-full">
            <ModalBase isOpen={isModalOpen} onClose={closeModal}>
                <FavouriteDetails favourite={currFav} closeModal={closeModal} load={handleLoad} remove={handleRemove}/>
            </ModalBase>
          <div className="grid gap-6 xs:gap-8 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {favourites.map((fav, index) => (
                <div key={index} className='bg-white  shadow-2xl flex flex-col'>

                    {/* image */}
                    <div className="flex flex-wrap max-h-20 xs:max-h-24 md:max-h-28 bg-gray-100 shadow-sm">
                    {fav.cart.slice(0,3).map( item => (
                        <img key={item.image} src={`https://storage.googleapis.com/item-images-bucket/${item.image}`}
                            alt={item.name} className="flex-grow-0 w-1/3 h-full object-cover"/>
                    ))}
                    </div>
                    <div className="px-6 py-3 flex flex-col h-full justify-between relative">
                        {/* Name */}
                        <h1 className="font-bold mb-2">{fav.name ? fav.name : `Favourite #${index + 1}`}</h1>

                        {/* First 3 */}
                        <div className="flex flex-col h-full"> 
                            {fav.cart.slice(0,3).map((item, index) => (
                                <div key={index} className="flex flex-row text-gray-800">
                                    {item.name} -
                                    <div className="flex">
                                    {item.portions.map( (p, index) => (
                                        <div key={index} className="ml-1">
                                            {p.size} ({p.quantity}){index != item.portions.length - 1 && ', '}
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {fav.cart.length > 3 && "+ more"}
                        {/* Buttons */}
                        <div className="flex my-3">
                            <button className="font-semibold text-red-600 hover:underline" 
                                onClick={() => handleRemove(fav._id)}>Remove
                            </button>
                            <button className="font-semibold text-red-600 hover:underline ml-4"
                                onClick={() => {
                                    openModal();
                                    setCurrFav(fav)
                                }}>Details
                            </button>
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-tl-full bg-green-600 absolute right-0 bottom-0 cursor-pointer" 
                                onClick={() => {
                                    openModal();
                                    setCurrFav(fav)
                                }}>
                                <div className="absolute right-[0.3rem] bottom-2 md:right-2 md:bottom-3 text-white">
                                    <AiOutlineRight size={25}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              ))}
          </div>
        </div>
    );
}
 
export default Favourites;