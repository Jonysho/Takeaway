import { useEffect, useState } from "react";
import { getAllMenuItemsApi, getMenuPdfApi } from "../../api/menuApi";
import MenuCard from "../../components/cards/MenuCard";

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        getAllMenuItemsApi()
        .then(response => {
            console.log(response.data)
            setMenuItems(response.data)
            })
        .catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className="p-8">
            <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuItems.map((item) => (
                <li key={item.itemId}>
                    <MenuCard menuItem={item}/>
                </li>
            ))}
            </ul>
        </div>
     );
}
 
export default Menu;
