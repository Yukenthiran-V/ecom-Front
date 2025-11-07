import{ createBrowserRouter} from 'react-router-dom';
import Home from '../Pages/Home';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import ErrorPage from '../Pages/ErrorPage';
import Categories from '../Pages/categories/Categories';
import OtpVerify from '../Pages/OtpVerificationPage';
import Logout from '../Pages/Logout';
import ShowCategories from '../Pages/categories/ShowCategories';
import ProductCategories from '../Pages/categories/ProductCategories';
import ScrollNavbar from '../workoutFiles/ScrollNavbar';
import TestingPages from '../dummy/testingfile';
import ProductInfo from '../Pages/products/ProductDetails';
import ProductListByCategory from '../Pages/products/ProductListByCategory';
import PaymentGateway from '../Pages/payment/PaymentGateway';
const router=createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path:"/signup",
        element:<Signup />
    },
    {
        path: "/login",
        element:<Login />
    },
    // {
    //     path:"/categories",
    //     element:<Categories />
    // },
    {
        path:"/signup/otpverify",
        element:<OtpVerify />
    },
    {
        path:"/logout",
        element:<Logout />
    },
    {
        path:"/categories22",
        element:<Categories />                                      
    },
    {
        path:"/scrollactive",
        element:<ScrollNavbar />
    },
    { 
        path:"/categories",
        element:<ProductCategories />
    },
    {
        path:"/testing",
        element:<TestingPages />
    },
    { 
        path:"/product",
        element:<ProductInfo />
    },
    {
        path:"/categories/:name",
        element:<ProductListByCategory />
    },
    {
        path:"/payment-gateway",
        element:<PaymentGateway />
    },
    //undefined web page set err msg
    {
        path:"*",
        element:<ErrorPage /> 
    }
]);

export default router;
