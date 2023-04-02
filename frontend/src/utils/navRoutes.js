import Checkout from "../pages/Checkout";
import Error404 from "../pages/Error404";
import Favourites from "../pages/Favourites";
import ForgotPassword from "../pages/ForgetPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import MyDetails from "../pages/MyDetails";
import MyOrders from "../pages/MyOrders";
import Register from "../pages/Register";
import SavedDishes from "../pages/SavedDishes";
import Security from "../pages/Security";

const withNavRoutes = [
    {
        path: '/',
        element: <Home/>
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
]

const withoutNavRoutes = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/forgotpassword',
        element: <ForgotPassword/>
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
        path: '/checkout',
        element: <Checkout/>
    },
    {
        path: '*',
        element: <Error404/>
    },
]

export {withNavRoutes, withoutNavRoutes}