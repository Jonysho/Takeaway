import { useEffect, useState } from "react";
import { getAllMenuItemsApi } from "../../api/menuApi";
import MenuCard from "../../components/cards/MenuCard";
import {mainCategories} from '../../utils/menu/itemCategories';
import subToMainCategory from  '../../utils/menu/subToMainCategory';
import {RxDividerVertical } from 'react-icons/rx';

const Menu = () => {
    const [menuItems, setMenuItems] = useState({});

    useEffect(() => {
        getAllMenuItemsApi()
        .then(response => {
            const groupedMenuItems = response.data.reduce((result, item) => {
                (result[subToMainCategory[item.category]] = result[subToMainCategory[item.category]] || []).push(item);
                return result;
            }, {});
            // sort the menu items by itemId
            Object.keys(groupedMenuItems).forEach(category => {
                groupedMenuItems[category].sort((a, b) => a.itemId - b.itemId);
            });
            setMenuItems(groupedMenuItems)
            console.log(groupedMenuItems)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div>
            <div className="bg-gray-200 w-full h-10 sm:h-14 sticky top-[3.0rem] sm:top-[4.5rem] lg:top-[4.4rem] z-[700] shadow-lg">
                <ul className="flex items-center justify-center h-full text-center">
                    {mainCategories.map(({title, path}, index) => (
                    <li key={title} className="flex items-center">
                        <a href={`#${path}`} className="text-black hover:text-red-500 font-light lg:font-normal text-xs xs:text-sm md:text-base lg:text-lg mx-2 sm:mx-4 lg:mx-8">
                            {title}
                        </a>
                        {index + 1 != mainCategories.length && <div className="hidden lg:inline-block items-center"><RxDividerVertical size={25}/></div>}
                    </li>

                    ))}
                </ul>
            </div>
            <div className="py-6 px-8 xs:px-4 sm:px-16 md:p-8 lg:px-12 xl:px-16 box-border">
            {mainCategories.map(({title, path}) => (   
                <div className="mb-4 relative scroll-mt-32" id={path} key={title}>
                    <span>
                        <h1 className="redline flex justify-center items-center font-bold text-2xl sm:text-3xl lg:text-4xl lg:mx-4 text-center text-green-600 drop-shadow-sm p-6 line">
                            {title}
                        </h1>
                    </span>
                    <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 my-3 mx-auto">
                    {menuItems[title] ? menuItems[title].map((item) => (
                        <li key={item.itemId}>
                            <MenuCard menuItem={item}/>
                        </li>
                        )) : <p className="mx-auto col-span-5"> No Items avaliable. </p>
                    }
                    </ul>
                </div>)
            )}
            </div>
        </div>
     );
}
 
export default Menu;
