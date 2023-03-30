import { useEffect, useState } from 'react';
import {HiMenu, HiUserCircle} from 'react-icons/hi';
import {BsFillBasket3Fill} from 'react-icons/bs';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import {RxCross2} from 'react-icons/rx';
import { NavLink, useLocation} from 'react-router-dom';
import Navbar from './Navbar';

const Header = ({username, total, location}) => {
  const [isOpen, setIsOpen] = useState(false); // lg screen nav
  const [isOpen2, setIsOpen2] = useState(false); // sm nav

  useEffect(() => {
    setIsOpen(false);
    setIsOpen2(false);
  }, [location])

  return (
      <div className='bg-white relative w-full flex flex-col items-center h-24 sm:h-36 lg:h-52 shadow-xl text-red-700 lg:text-yellow-300'>
        <div className='w-full h-full flex mb-1 p-1 border-b-2 sm:border-b-0 items-center border-gray-500/5 justify-between lg:bg-red-700 lg:py-10'>
          <div className='border-r-2 px-3 border-gray-500/50 cursor-pointer sm:p-3 sm:px-10 block lg:hidden'>
            <div onClick={() => setIsOpen2(!isOpen2)}>
            {!isOpen2 ? <HiMenu size={30} /> : <RxCross2 size={30}/>}
            </div>
            <nav className={isOpen2 ? 'bg-white w-full h-full fixed top-24 sm:top-36 left-0 flex-col flex-grow ease-in-out duration-500 z-[1000]' : 'fixed left-[-100%]'}>
                <Navbar username={username}/>
            </nav>
          </div>
          <NavLink to="/" className='p-1 font-bold text-xl sm:text-3xl lg:text-5xl items-center m-auto'><h1>Ho's Kitchen</h1></NavLink>
          <NavLink to="/checkout">
            <div className='border-l-2 px-3 items-center border-gray-500/50 cursor-pointer sm:p-3 sm:px-10 flex sm:justify-around lg:hidden'>
                <div className='w-full'><BsFillBasket3Fill size={28}/></div>
                <div className='hidden w-full sm:flex lg:hidden items-center pl-2'>£{total}.00</div>
            </div>
          </NavLink>
          <div className='sm:p-3 hidden lg:flex items-center absolute right-6'>
            <HiUserCircle size={22}/>
            <div className='ml-4 flex cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
              <span className='text-xl font-semibold pr-2'>{username}</span>
              {!isOpen ? <IoIosArrowDown size={30}/> : <IoIosArrowUp size={30}/>}
            </div>
            {isOpen && <div className='absolute top-12 left-14 w-0 h-0 border-[20px] border-transparent border-t-0 border-b-[25px] border-b-white'></div>}
            {isOpen && <nav className='bg-white absolute right-0 top-10 z-1000 text-black shadow-xl my-8 p-4 w-[22rem] transition-all ease-in-out duration-300 transform translate-x-full lg:translate-x-0'>
            {/* transition-all ease-in-out duration-300 transform translate-x-full sm:translate-x-0' */}
              <Navbar username={username}/>
                </nav>}
          </div>
        </div>

        <div className='w-full flex justify-evenly h-full items-center relative'>
          <NavLink to="/menu"><span className=' text-gray-700 font-semibold hover:text-red-600 sm:text-xl sm:font-bold lg:text-2xl'>Menu</span></NavLink>
          <NavLink to="/menu"><span className=' text-gray-700 font-semibold hover:text-red-600 sm:text-xl sm:font-bold lg:text-2xl'>Order Now</span></NavLink>
          <NavLink to="/myorders"><span className=' text-gray-700 font-semibold hover:text-red-600 sm:text-xl sm:font-bold lg:text-2xl'>My Orders</span></NavLink>
        </div>
      </div>
    );
}
 
export default Header;