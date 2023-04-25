import AuthRoute from "../components/AuthRoute";
import EmailVerify from "../pages/EmailVerify";
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
        element: <AuthRoute element={<Favourites />} redirectPath="/login" />
    },
    {
        path: '/saved-dishes',
        element: <AuthRoute element={<SavedDishes />} redirectPath="/login" />
    },
    {
        path: '/personal-details',
        element: <AuthRoute element={<MyDetails />} redirectPath="/login" />
    },
    {
        path: '/security',
        element: <AuthRoute element={<Security />} redirectPath="/login" />
    },
]

const withoutNavRoutes = [
    {
        path: '/login',
        element: <AuthRoute path="/login" element={<Login />} redirectPath="/login" />
    },
    {
        path: '/register',
        element: <AuthRoute path="/register" element={<Register />} redirectPath="/login" />
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
        element: <AuthRoute element={<MyOrders />} redirectPath="/login" />
    },
    {
        path: '/checkout',
        element: <AuthRoute element={<Checkout />} redirectPath="/login" />
    },
    {
        path: '/user/:id/verify/:token',
        element: <EmailVerify/>
    },
    {
        path: '*',
        element: <Error404/>
    },
]

export {withNavRoutes, withoutNavRoutes}