import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { useState } from "react";
import Menu from "./pages/Menu";
import { Route, Routes, useLocation, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyDetails from "./pages/MyDetails";
import Security from "./pages/Security";
import SavedDishes from "./pages/SavedDishes";
import Favourites from "./pages/Favourites";
import {routes} from './utils/navRoutes';
import PageNav from "./components/PageNav";
import { navItems } from "./utils/navItems";
import ContentTitle from "./components/ContentTitle";

const App = () => {
  const [username, setUsername] = useState('Jon')
  const [total, setTotal] = useState(0)
  const content = useRoutes(routes)
  const location = useLocation();
  // 24 36 52
  return (
    <div className="bg-gray-50 absolute top-0 left-0 h-full w-full overflow-auto">
      <div className="flex flex-col"> 
        <div className='sticky top-[-3rem] sm:top-[-4.5rem] lg:top-[-8.6rem] z-[800]'>
          <Header username={username} total={total} location={location}/>
        </div>
        <main className="h-full flex flex-col">
          <div className="px-4 py-6 flex-1">
            <ContentTitle location={location}/>
            <div className="flex">
            <PageNav navItems={navItems}/>
            <div className="p-4 w-full">
              {content}
            </div>
            </div>
          </div>
          <div className="mt-auto">
            <Footer />
          </div>
        </main>
      </div>
    </div>
    
   );
}
 
export default App;