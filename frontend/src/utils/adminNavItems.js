import {IoMdStats} from 'react-icons/io';
import {HiTrendingUp} from 'react-icons/hi';
import {BiFoodMenu} from 'react-icons/bi';
import {FaUsersCog} from 'react-icons/fa';

export const adminNavItems = [
    {
        id: 1,
        title: 'Dashboard',
        link: '/admin/dashboard',
        icon: <IoMdStats size={30}/>,
    },
    {
        id: 2,
        title: 'Income',
        link: '/admin/income',
        icon: <HiTrendingUp size={30}/>,
    },
    {
        id: 3,
        title: 'Menu',
        link: '/admin/menu',
        icon: <BiFoodMenu size={30}/>,
    },
    {
        id: 4,
        title: 'Users',
        link: '/admin/users',
        icon: <FaUsersCog size={30}/>,
    },
]