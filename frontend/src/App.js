import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import {routes} from './utils/navRoutes';
import PageNav from "./components/PageNav";
import { navItems } from "./utils/navItems";
import ContentTitle from "./components/ContentTitle";
import Menu from "./pages/Menu";

const App = () => {
  const [username, setUsername] = useState('Jon')
  const [total, setTotal] = useState(0)
  const [isShopOpen, setIsShopOpen] = useState(false)
  const content = useRoutes(routes)
  const location = useLocation();

  console.log(location.pathname)

  return (
    <div className="bg-gray-50 absolute top-0 left-0 h-full w-full overflow-auto">
      <div className="flex flex-col"> 
        <div className='sticky top-[-3rem] sm:top-[-4.5rem] lg:top-[-8.6rem] z-[800]'>
          <Header username={username} total={total} location={location} isShopOpen={isShopOpen}/>
        </div>
        <main className="h-full flex flex-col">
        {location.pathname === "/menu" ? 
          (
            <div className="px-4 py-6 flex-1"> <Menu/> </div>
          ) : (
            <div className="px-4 py-6 flex-1">
            <ContentTitle location={location}/>
              <div className="flex">
              <PageNav navItems={navItems}/>
                <div className="p-4 w-full">
                  {content}
                </div>
              </div>
            </div>
          )
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