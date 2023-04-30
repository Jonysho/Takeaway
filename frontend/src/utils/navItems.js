import {AiTwotoneHome, AiFillLock} from "react-icons/ai";
import {MdOutlineFavorite} from "react-icons/md";
import {GiBowlOfRice} from "react-icons/gi";
import {HiUserCircle} from "react-icons/hi";

export const navItems = [
    {
        id: 1,
        title: 'Home',
        link: '/',
        icon: <AiTwotoneHome size={30}/>,
    },
    {
        id: 2,
        title: 'Favourite Orders',
        link: '/favourites',
        icon: <MdOutlineFavorite size={30}/>,
    },
    {
        id: 3,
        title: 'Saved Dishes',
        link: '/saved-dishes',
        icon: <GiBowlOfRice size={30}/>,
    },
    {
        id: 4,
        title: 'My Details',
        link: '/personal-details',
        icon: <HiUserCircle size={30}/>,
    },
    {
        id: 5,
        title: 'Change Password',
        link: '/security',
        icon: <AiFillLock size={30}/>,
    },
]