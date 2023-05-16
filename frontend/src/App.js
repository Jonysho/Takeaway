import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import { useActionData, useLocation, useRoutes } from "react-router-dom";
import {withNavRoutes,  withoutNavRoutes} from './utils/navRoutes';
import SideNav from "./components/navigation/SideNav";
import { navItems } from "./utils/navItems";
import ContentTitle from "./components/ContentTitle";
import { adminNavItems } from "./utils/adminNavItems";
import { useAuthContext } from "./customHooks/useAuthContext";
import Navbar from "./components/navigation/Navbar";

const App = () => {
  const [total, setTotal] = useState(0)
  const [isShopOpen, setIsShopOpen] = useState(false)
  const location = useLocation();
  const { user } = useAuthContext()
  const [isNavMBOpen, setIsNavMBOpen] = useState(false); // mobile nav
  
  // Check if page needs rendering with or without side nav
  const isWithSideNav = () => {
    let withNav = false;
    withNavRoutes.map(route => {
      if (route.path === location.pathname){
        withNav = true}
      })
      
      return withNav
  }

  const isAdminLocation = () => {
    return location.pathname.startsWith("/admin")
  }

  const navContent = useRoutes(withNavRoutes)
  const otherContent = useRoutes(withoutNavRoutes)

  return (
    <div className={`bg-gray-50 absolute top-0 left-0 h-full w-full ${isNavMBOpen ? 'overflow-hidden' : 'overflow-auto'}`}>
      <div className="flex flex-col">
        <div className='sticky top-[-3rem] sm:top-[-4.5rem] lg:top-[-8.6rem] z-[800]'>
          <Header total={total} location={location} isShopOpen={isShopOpen} isNavMBOpen={isNavMBOpen} setIsNavMBOpen={setIsNavMBOpen}/>
        </div>
        <main className="h-full flex flex-col">
        {!isWithSideNav() ? 
          (
            <div className="min-h-[100vh]"> {otherContent} </div>
          ) : <div className="px-4 py-6 flex-1">
              <div className="flex min-h-[100vh]">
                {user && <SideNav navItems={isAdminLocation() ? adminNavItems : navItems}/>}
                <div className="p-4 w-full">
                  <ContentTitle location={location} navItems={isAdminLocation() ? adminNavItems : navItems}/>
                  {navContent}
                </div>
              </div>
            </div>
          }
          <div className="mt-auto">
            <Footer />
          </div>
        </main> 
      </div>
    </div>
    
   );
}
 
export default App;