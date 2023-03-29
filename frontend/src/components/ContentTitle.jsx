import { useEffect, useState } from "react";
import { navItems } from "../utils/navItems";

const ContentTitle = ({location}) => {
    const [title, setTitle] = useState('Home')
        
    const findTitle = (path) => {
        let newTitle;
        navItems.map((item) => {
            if (item.link === path) newTitle = item.title
        })
        return newTitle
    }

    useEffect(() => {
        const path = location.pathname
        const newTitle = findTitle(path)
        setTitle(newTitle)
    }, [location])
    
    return ( 
        <div className="mb-1 sm:mb-2 lg:mb-4 lg:pl-64">
            <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center text-green-600">{title}</h1>
        </div>
     );
}
 
export default ContentTitle;