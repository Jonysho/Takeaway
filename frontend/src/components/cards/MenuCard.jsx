import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {TbChefHat} from 'react-icons/tb';
import {GiChiliPepper} from 'react-icons/gi';
import {AiFillInfoCircle, AiOutlineClose, AiOutlineConsoleSql} from 'react-icons/ai';
import { useCartContext } from "../../customHooks/useCartContext";
import { addToCartApi } from "../../api/cartApi";
import { useAuthContext } from "../../customHooks/useAuthContext";

const MenuCard = ({menuItem, image}) => {
    const [selectedOption, setSelectedOption] = useState(menuItem.portions[0].size)
    const [moreInfo, setMoreInfo] = useState(false)
    const { dispatch } = useCartContext()
    const { user } = useAuthContext()

    const handleAdd = async () => {
        console.log(selectedOption)
        try {
            const response = await addToCartApi(user.id, menuItem.itemId, selectedOption, user.token)
            dispatch({type: "SET_CART", payload: response.data.cart})
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md border border-black text-sm md:text-base">
            <div className="w-full h-48 relative overflow-hidden rounded-t-lg">
                {moreInfo && (
                <div>
                    <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40 z-[50]">
                    </div>
                    <div className="absolute text-white z-[100] flex justify-center items-center w-full h-full">
                        {menuItem.moreInfo}
                    </div>
                </div>
                )}
                <div className="absolute flex w-full justify-between p-1">
                <div className="flex">
                    {menuItem.recommended && <TbChefHat size={35} className="rounded-full shadow-sm bg-gray-50 border-2 border-gray-100 m-1 p-1" title="Chef Recommended"/>}
                    {menuItem.hot && <GiChiliPepper size={35} className="rounded-full shadow-sm bg-gray-50 border-2 border-gray-100 m-1 p-1 text-red-600" title="Hot & Spicy"/>}
                </div>
                {moreInfo ? <AiOutlineClose size={35} className="text-white z-[100] cursor-pointer m-1" onClick={() => setMoreInfo(!moreInfo)}/> :
                <AiFillInfoCircle size={35} className="text-sky-600 bg-white rounded-full m-1 cursor-pointer" onClick={() => setMoreInfo(!moreInfo)} title="More Info"/>}
                </div>
                {menuItem.image || image ? (
                    <img src={image ? image : `https://storage.googleapis.com/item-images-bucket/${menuItem.image}`}
                    alt={menuItem.name} className="w-full h-full object-cover"/> )
                    
                    : <div className="bg-gray-200 h-full w-full flex justify-center items-center">Image not avaliable</div>
                }
            </div>
            

            <div className="px-6 py-4 flex flex-col">
                <span className="text-lg font-semibold">{menuItem.name ? `${menuItem.itemId}. ${menuItem.name}` : "Item Name"}</span>
                <div className="my-4 mx-1 rounded-lg relative border-2 border-gray-300 hover:text-red-500 hover:border-red-500 flex justify-end items-center">
                    <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} 
                    className="rounded-lg border-0 w-full appearance-none text-black focus:outline-none p-3 cursor-pointer">
                        {menuItem.portions.length > 0 ? menuItem.portions.map(({size, price}) => (
                            <option key={size} value={size} >
                                {size} £{parseFloat(price).toFixed(2)}
                            </option>
                        )) : <option> Portion: Price</option>}
                    </select>
                    <div className="absolute pointer-events-none right-2"><IoIosArrowDown size={20}/></div>
                </div>
                <button className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-all" onClick={handleAdd}>Add to Cart</button>
            </div>
        </div>
     );
}
 
export default MenuCard;