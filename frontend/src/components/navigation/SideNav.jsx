import { NavLink } from "react-router-dom";

const SideNav = ({ navItems }) => (
    <div className="hidden lg:flex flex-shrink-0 p-4 h-full sticky lg:top-20 z-50 mt-16">
      <ul className="flex flex-col justify-start bg-white shadow-lg">
        {navItems.map((item, index) => {
          if (item.title !== 'Logout') {
          return ( 
          <li key={index} className={index + 1 != navItems.length ? "border-b-2 border-gray-700/20" : ""}>
          <NavLink to={item.link}>
            <span className="flex items-center px-6 py-2 m-3 text-red-700 hover:text-red-600 font-semibold cursor-pointer">
                {item.icon}
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
export default SideNav;