import { IoIosArrowForward } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { navItems } from "../utils/navItems";

const Navbar = ({username}) => {
    return ( 
        <ul className="pt-5 w-[90%] ml-6 lg:w-full lg:ml-0 lg:pt-0">
            <span className="lg:hidden text-xl text-gray-700 text-bold flex items-center justify-between pl-7 pb-2 border-b-2 ">{username}</span>
        {navItems.map((item, index) => {
            return <li key={item.id} className={index + 1 != navItems.length ? "border-b-2 border-yellow-500 border-opacity-20 transition-transform ease-in-out duration-300 transform" : " "}>
            <NavLink to={item.link}>
            <span className='flex items-center justify-between p-3 sm:p-4 ml-6 lg:mx-3 lg:p-3 text-red-700 hover:text-red-600 font-semibold cursor-pointer'> {item.title} <IoIosArrowForward size={26}/>
            </span>
            </NavLink>
            </li> 
        })}
        </ul>
     );
}
 
export default Navbar;