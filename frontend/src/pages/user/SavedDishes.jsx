import { useState } from "react";
import CardLayout from "../../components/cards/CardLayout";

const SavedDishes = () => {

    // Get favourite orders for current user from MongoDB
    const [dishes, setDishes] = useState(null)

    return (
        <div className="w-full text-center">
            {dishes ? <CardLayout cards={dishes} /> : 
            <div className="w-full">
                <p className="pb-2 font-bold">There are currently no saved dishes.</p>
                <p className="text-sm lg:text-base p-2">You can name and favourite your dishes prior to ordering for quicker ordering next time.</p>
            </div>
            }
        </div>
    )
}
 
export default SavedDishes;