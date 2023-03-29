import {AiTwotoneHome, AiFillLock} from "react-icons/ai";
import {MdOutlineFavorite} from "react-icons/md";
import {GiBowlOfRice} from "react-icons/gi";
import {HiUserCircle} from "react-icons/hi";
import {BiLogOut} from "react-icons/bi";

export const navItems = [
    {
        id: 1,
        title: 'Home',
        link: '/',
        icon: AiTwotoneHome,
    },
    {
        id: 2,
        title: 'Favourite Orders',
        link: '/favourites',
        icon: MdOutlineFavorite,
    },
    {
        id: 3,
        title: 'Saved Dishes',
        link: '/saved-dishes',
        icon: GiBowlOfRice,
    },
    {
        id: 4,
        title: 'My Details',
        link: '/personal-details',
        icon: HiUserCircle,
    },
    {
        id: 5,
        title: 'Change Password',
        link: '/security',
        icon: AiFillLock,
    },
    {
        id: 6,
        title: 'Logout',
        link: '/logout',
        icon: BiLogOut,
    },
]