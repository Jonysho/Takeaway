import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useLogout } from "../../customHooks/useLogout";
import { navItems } from "../../utils/navItems";

const Navbar = ({user}) => {
    const { logout } = useLogout()
    const handleClick = () => {
        logout()
        console.log("Logged out.")
    }
    return ( 
        <ul className="pt-5 w-[90%] ml-6 lg:w-full lg:ml-0 lg:pt-0">
            { user ? (
            <div>
                <span className="lg:hidden text-xl text-gray-700 text-bold flex items-center justify-between pl-7 pb-2 border-b-2 ">{user.firstname}</span>                    
                {navItems.map((item, index) => {
                    return <li key={item.id} className={"border-b-2 border-gray-700/20"}>
                    <NavLink to={item.link}>
                    <span className='flex items-center justify-between p-3 sm:p-4 ml-6 lg:mx-3 lg:p-3 text-red-700 hover:text-red-600 font-semibold'> {item.title} <IoIosArrowForward size={26}/>
                    </span>
                    </NavLink>
                    </li>
                })}
                <li key="logout" onClick={handleClick} className="cursor-pointer">
                <span className='flex items-center justify-between p-3 sm:p-4 ml-6 lg:mx-3 lg:p-3 text-red-700 hover:text-red-600 font-semibold'> Logout <IoIosArrowForward size={26}/> 
                </span>
                </li>
            </div> ) :
            ( <div>
                <NavLink to="/login">
                <li key="login" onClick={handleClick} className="cursor-pointer border-y-2 border-gray-700/5">
                    <span className='flex items-center justify-between p-3 sm:p-4 ml-6 lg:mx-3 lg:p-3 text-red-700 hover:text-red-600 font-semibold'> Login <IoIosArrowForward size={26}/> 
                    </span>
                </li>
                </NavLink>
                <NavLink to="/register">
                <li key="register" onClick={handleClick} className="cursor-pointer border-b-2 border-gray-700/5">
                    <span className='flex items-center justify-between p-3 sm:p-4 ml-6 lg:mx-3 lg:p-3 text-red-700 hover:text-red-600 font-semibold'> Register <IoIosArrowForward size={26}/> 
                    </span>
                </li> 
                </NavLink>
            </div>
            )
            }
        </ul>
     );
}
 
export default Navbar;