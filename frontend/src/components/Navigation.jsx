import { menuItems } from "../utils/menuItems"

const Navigation = ({active, setActive}) => {
    return (  
        <div className="user-con">
            <ul>
                {menuItems.map(item => {
                    return <li 
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}>
                        {item.icon}
                        <span className="ml-1 "> {item.title}</span>
                    </li>
                })}
            </ul>
        </div>
    );
}
 
export default Navigation;