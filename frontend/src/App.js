import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import {withNavRoutes,  withoutNavRoutes} from './utils/navRoutes';
import SideNav from "./components/SideNav";
import { navItems } from "./utils/navItems";
import ContentTitle from "./components/ContentTitle";
import { useAuthContext } from "./customHooks/useAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  const [total, setTotal] = useState(0)
  const [isShopOpen, setIsShopOpen] = useState(false)
  const location = useLocation();
  const { user } = useAuthContext();
  
  // Check if page needs rendering with or without side nav
  const checkLocation = () => {
    let withNav = false;
    withNavRoutes.map(route => {
      if (route.path === location.pathname){
        withNav = true}
      })
      
      return withNav
    }

  const navContent = useRoutes(withNavRoutes)
  const otherContent = useRoutes(withoutNavRoutes)
    
  return (
    <div className="bg-gray-50 absolute top-0 left-0 h-full w-full overflow-auto">
      <div className="flex flex-col"> 
        <div className='sticky top-[-3rem] sm:top-[-4.5rem] lg:top-[-8.6rem] z-[800]'>
          <Header total={total} location={location} isShopOpen={isShopOpen}/>
        </div>
        <main className="h-full flex flex-col">
        {!checkLocation() ? 
          (
            <div> {otherContent} </div>
          ) : <div className="px-4 py-6 flex-1">
            <ContentTitle location={location}/>
              <div className="flex">
              <SideNav navItems={navItems}/>
                <div className="p-4 w-full">
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