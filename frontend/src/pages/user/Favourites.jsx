import { useState } from "react";
import CardLayout from "../../components/cards/CardLayout";

const Favourites = () => {
    // Get favourite orders for current user from MongoDB
    const [favourites, setFavourites] = useState(null)

    // Get recent orders for current user from MongoDB
    const [recents, setRecents] = useState(null)

    return (
        <div className="w-full text-center">
            {favourites ? <CardLayout cards={favourites} /> : 
            <div className="w-full">
                <p className="pb-2 font-bold">There are currently no saved favourite orders.</p>
                <p className="text-sm lg:text-base p-2">You can name and favourite your orders prior to ordering for quicker ordering next time.</p>
            </div>
            }
            {recents ? <CardLayout cards={recents} /> : 
            <div>
                <span>
                    <h1 className="redline flex justify-center items-center font-bold text-2xl sm:text-3xl lg:text-4xl lg:mx-4 text-center text-green-600 drop-shadow-sm p-6 line">Recent Orders</h1>
                </span>
                <p className="pb-2 font-bold">There are currently no recent orders.</p>
                <p className="text-sm p-2">Your recent orders will appear here for quicker ordering next time.</p>
            </div>
            }
        </div>
    )
}
 
export default Favourites;