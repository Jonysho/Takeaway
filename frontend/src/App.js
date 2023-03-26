import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { useState } from "react";
import Menu from "./pages/Menu";
import { Route, Routes, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyDetails from "./pages/MyDetails";
import Security from "./pages/Security";
import SavedDishes from "./pages/SavedDishes";
import Favourites from "./pages/Favourites";
import {routes} from './utils/navRoutes';

const App = () => {
  const [username, setUsername] = useState('Jon')
  const [total, setTotal] = useState(0)
  const content = useRoutes(routes)
  return (
    <div className="bg-gray-50 absolute top-0 left-0 h-full w-full">
      <Header username={username} total={total}/>
        <main>
          {content}
        </main>
      <Footer/>
    </div>
    
   );
}
 
export default App;