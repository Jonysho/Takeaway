import AuthRoute from "../components/auth/AuthRoute";
import EmailVerify from "../pages/all/EmailVerify";
import Error404 from "../pages/all/Error404";
import Home from "../pages/all/Home";
import Login from "../pages/all/Login";
import Register from "../pages/all/Register";
import Checkout from "../pages/user/Checkout";
import Favourites from "../pages/user/Favourites";
import MyDetails from "../pages/user/MyDetails";
import Security from "../pages/user/Security";
import SavedDishes from "../pages/user/SavedDishes";
import ForgotPassword from "../pages/all/ForgotPassword";
import Menu from "../pages/all/Menu";
import MyOrders from "../pages/user/MyOrders";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminIncome from "../pages/admin/AdminIncome";
import AdminMenu from "../pages/admin/AdminMenu";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminAuthRoute from "../components/auth/AdminAuthRoute";

const withNavRoutes = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/favourites',
        element: <AuthRoute element={<Favourites />}/>
    },
    {
        path: '/saved-dishes',
        element: <AuthRoute element={<SavedDishes />}/>
    },
    {
        path: '/personal-details',
        element: <AuthRoute element={<MyDetails />}/>
    },
    {
        path: '/security',
        element: <AuthRoute element={<Security />}/>
    },
    {
        path: "/admin/dashboard",
        element: <AdminAuthRoute element={<AdminDashboard/>}/>
    },
    {
        path: "/admin/income",
        element: <AdminAuthRoute element={<AdminIncome/>}/>
    },
    {
        path: "/admin/menu",
        element: <AdminAuthRoute element={<AdminMenu/>}/>
    },
    {
        path: "/admin/users",
        element: <AdminAuthRoute element={<AdminUsers/>}/>
    },
]

const withoutNavRoutes = [
    {
        path: '/login',
        element: <AuthRoute path="/login" element={<Login />}/>
    },
    {
        path: '/register',
        element: <AuthRoute path="/register" element={<Register />}/>
    },
    {
        path: '/forgotpassword',
        element: <ForgotPassword />
    },
    {
        path: '/menu',
        element: <Menu/>
    },
    {
        path: '/myorders',
        element: <AuthRoute element={<MyOrders />}/>
    },
    {
        path: '/checkout',
        element: <AuthRoute element={<Checkout />}/>
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