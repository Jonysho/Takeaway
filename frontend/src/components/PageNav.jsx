import { NavLink } from "react-router-dom";

const PageNav = ({ navItems }) => (
    <div className="hidden lg:flex flex-shrink-0 p-4 h-full sticky top-56 z-50">
      <ul className="flex flex-col justify-start bg-white shadow-lg">
        {navItems.map((item, index) => {
          if (item.title != 'Logout') {
          const Icon = item.icon
          return ( 
          <li key={index} className={index + 2 != navItems.length ? "border-b-2 border-gray-700 border-opacity-20" : ""}>
          <NavLink to={item.link}>
            <span className="flex items-center px-6 py-2 m-3 text-red-700 hover:text-red-600 font-semibold cursor-pointer">
                <Icon size={30}/>
                <h1 className="ml-5">
                {item.title}
                </h1>
              </span>
          </NavLink>
          </li>)}
        })}
      </ul>
    </div>
  );
export default PageNav;