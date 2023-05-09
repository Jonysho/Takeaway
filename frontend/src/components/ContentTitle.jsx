import { useEffect, useState } from "react";

const ContentTitle = ({location, navItems}) => {
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
        <div className="mb-5">
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl lg:mx-4 text-center text-green-600 drop-shadow-sm">{title}</h1>
        </div>
     );
}
 
export default ContentTitle;