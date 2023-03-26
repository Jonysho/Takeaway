import Checkout from "../pages/Checkout";
import Error404 from "../pages/Error404";
import Favourites from "../pages/Favourites";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import MyDetails from "../pages/MyDetails";
import MyOrders from "../pages/MyOrders";
import Register from "../pages/Register";
import SavedDishes from "../pages/SavedDishes";
import Security from "../pages/Security";

export const routes = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/menu',
        element: <Menu/>
    },
    {
        path: '/myorders',
        element: <MyOrders/>
    },
    {
        path: '/favourites',
        element: <Favourites/>
    },
    {
        path: '/saved-dishes',
        element: <SavedDishes/>
    },
    {
        path: '/personal-details',
        element: <MyDetails/>
    },
    {
        path: '/security',
        element: <Security/>
    },
    {
        path: '/checkout',
        element: <Checkout/>
    },
    {
        path: '*',
        element: <Error404/>
    },

]