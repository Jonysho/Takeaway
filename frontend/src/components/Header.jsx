import { useEffect, useState } from 'react';
import {HiMenu, HiUserCircle} from 'react-icons/hi';
import {BsFillBasket3Fill} from 'react-icons/bs';
import {AiOutlineShop} from 'react-icons/ai';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import {RxCross2} from 'react-icons/rx';
import { Link, NavLink} from 'react-router-dom';
import Navbar from './navigation/Navbar';
import InfoModal from './Modal/InfoModal';
import { useClickOutside } from '../customHooks/useClickOutside';
import { useAuthContext } from '../customHooks/useAuthContext';
import { useDetails } from '../customHooks/useDetails';
import { useCartContext } from '../customHooks/useCartContext';
import { useStatus } from '../customHooks/useStatus';
import ModalBase from './Modal/ModalBase';

const Header = ({location, isNavMBOpen, setIsNavMBOpen}) => {
  const [isNavDTOpen, setIsNavDTOpen] = useState(false); // desktop Nav
  const status = useStatus()

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
      setModalOpen(false);
  };

  const { user } = useAuthContext()
  const { total } = useCartContext()
  const {userInfo, getDetails} = useDetails()

  const resetNavs = () => {
    setIsNavDTOpen(false);
    setIsNavMBOpen(false);
    closeModal()
  }

  const navRef = useClickOutside(resetNavs);

  useEffect(() => {
      if (user){
        getDetails(user.id, user.token)
      }
  }, [user])

  useEffect(() => {
    resetNavs()
  }, [location])

  return (
      <div ref={navRef} className='bg-white relative w-full flex flex-col items-center h-24 sm:h-36 lg:h-52 shadow-xl text-red-700 lg:text-yellow-300'>
        <div className='w-full h-full flex mb-1 p-1 border-b-2 sm:border-b-0 items-center border-gray-500/5 justify-center lg:bg-red-700 lg:py-10 z-[1000]'>
        <div className='flex justify-center w-full items-center max-w-7xl relative'>
          <div className='border-r-2 px-3 border-gray-500/50 sm:p-3 sm:px-10 block lg:hidden '>
            <div className='cursor-pointer' onClick={() => setIsNavMBOpen(!isNavMBOpen)}>
            {!isNavMBOpen ? <HiMenu size={30} /> : <RxCross2 size={30}/>}
            </div>
          </div>
          <nav className={isNavMBOpen ? 'bg-white w-full h-[calc(100vh-6rem)] sm:h-[calc(100vh-9rem)] overflow-y-auto fixed top-24 sm:top-36 left-0 flex-col flex-grow ease-in-out duration-500 block lg:hidden' : 'fixed left-[-100%]'}>
              <Navbar user={user} firstname={userInfo && userInfo.firstname}/>
          </nav>
          <NavLink to="/" className='p-1 font-bold text-xl sm:text-3xl lg:text-5xl items-center m-auto'><h1>Ho's Kitchen</h1></NavLink>
            <div className='border-l-2 px-3 border-gray-500/50 sm:p-3 sm:px-8 lg:hidden'>
            <NavLink to="/checkout/summary">
              <div className='items-center flex sm:justify-around'>
                  <div className='w-full'><BsFillBasket3Fill size={26}/></div>
                  <div className='hidden w-full sm:flex lg:hidden items-center pl-2'>£{total}</div>
              </div>
            </NavLink>
            </div>
          { user ? (
          <div className='sm:p-3 hidden lg:flex items-center absolute right-6'>
            <HiUserCircle size={22}/>
            <div className='ml-4 flex cursor-pointer' onClick={() => setIsNavDTOpen(!isNavDTOpen)}>
              <span className='text-xl font-semibold pr-2'>{userInfo && userInfo.firstname} </span>
              {!isNavDTOpen ? <IoIosArrowDown size={30}/> : <IoIosArrowUp size={30}/>}
            </div>
            {isNavDTOpen && <div className='absolute top-12 left-14 w-0 h-0 border-[20px] border-transparent border-t-0 border-b-[25px] border-b-white'></div>} {/*Triangle Above navbox*/}
            {isNavDTOpen && 
              <nav className='bg-white absolute right-0 top-10 z-1000 text-black shadow-xl my-8 p-4 w-[22rem] transition-all ease-in-out duration-300 transform translate-x-full lg:translate-x-0'>
              <Navbar user={user} firstname={userInfo && userInfo.firstname}/>
              </nav>}
          </div> ) :
          (
            <div className='sm:p-3 hidden lg:flex items-center absolute right-0'>
              <Link to="/login"><span className='px-3 text-xl border-r border-black/40'>Login</span></Link>
              <Link to="/register"><span className='px-3 text-xl border-l border-black/40'>Register</span></Link>
            </div>
          )
          }
        </div>
        </div>
        {/* Navbar */}
        <nav className='w-full flex h-full items-center relative text-black max-w-7xl'>
          <div className='hidden lg:flex ml-[5%] w-72 h-12 bg-blue-500 text-white rounded-3xl hover:bg-blue-700 focus:outline-none focus:bg-blue-700 shadow-sm'>
            <div className="flex items-center justify-between w-full px-4 cursor-pointer" onClick={openModal}>
                <span><AiOutlineShop size={25}/></span>
                <span className='text-lg font-semibold'> Collection Only </span>
                <span className='bg-blue-600 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 rounded-3xl p-2'> {status}  </span>
            </div>
          </div>
          <div className='flex mx-auto space-x-4 h-full'>
            <NavLink to="/menu" className="relative"><span className='active-border-bottom h-full flex items-center text-gray-700 font-semibold hover:text-red-600 sm:text-xl sm:font-bold lg:text-2xl'>MENU</span></NavLink>
            <NavLink to="/myorders" className="relative"><span className='active-border-bottom h-full flex items-center text-gray-700 font-semibold hover:text-red-600 sm:text-xl sm:font-bold lg:text-2xl'>MY ORDERS</span></NavLink>
            {user && user.isAdmin && <NavLink to="/admin/dashboard" className="relative"><span className='active-border-bottom h-full hidden lg:flex items-center text-gray-700 font-semibold hover:text-red-600 sm:text-xl sm:font-bold lg:text-2xl'>ADMIN</span></NavLink>}
          </div>
          <div className='hidden lg:flex mr-[5%] w-64 h-12 bg-green-500 text-white rounded-3xl hover:bg-green-700 focus:outline-none focus:bg-green-700 shadow-sm'>
            <NavLink to="/checkout/summary" className="flex items-center justify-between w-full px-4">
                  <p><BsFillBasket3Fill size={25}/></p>
                  <p className='text-lg font-semibold'> Basket </p>
                  <p className='bg-green-600 hover:bg-green-700 focus:outline-none focus:bg-green-700 rounded-3xl p-2'> £{total} </p>
            </NavLink>
          </div>
        </nav>
        <ModalBase isOpen={isModalOpen} onClose={closeModal}>
          <InfoModal closeModal={closeModal}/>
        </ModalBase>
      </div>
    );
}
 
export default Header;