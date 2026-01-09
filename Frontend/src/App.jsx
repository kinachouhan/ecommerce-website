import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Cart } from './cart/Cart';
import { MainLayout } from './layout/MainLayout';
import { AdminLayout } from './layout/AdminLayout';
import { AdminAddItems } from './pages/AdminAddItems';
import { AdminListItems } from './pages/AdminListItems';
import { Orders } from './pages/Orders';
import { Toaster } from "react-hot-toast"
import { SingleProductDetails } from './pages/SingleProductDetails';
import { Checkout } from './pages/Checkout';
import { SuccessOrder } from './pages/SuccessOrder';
import { AllOrders } from './pages/AllOrders';
import { Profile } from './pages/Profile';
import {useDispatch} from "react-redux"
import {setUser} from "./redux/authSlice.js"
import {useEffect} from "react"

function App() {

  const dispatch = useDispatch();
 const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API}/api/v1/users/me`, {
          credentials: "include" 
        });
        const data = await res.json();
        if (data.success) {
          dispatch(setUser(data.responseData));
        }
      } catch (error) {
        console.log("No logged in user", error);
      }
    };

    fetchUser();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true, element: <Home />,
        },
        {
          path: "/collection", element: <Collection />
        },
        {
          path: "/about", element: <About />
        },
        {
          path: "/contact", element: <Contact />
        },
        {
          path: "/profile", element: <Profile />
        },
        {
          path: "/cart", element: <Cart />
        },
        {
          path: "/checkout", element: <Checkout />
        },
        {
          path: "/success-order", element: <SuccessOrder />
        },
        {
          path: "/all-orders", element: <AllOrders />
        },
        {
          path: "/product/:id", element: <SingleProductDetails />
        }
      ]
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [

        {
          index: true, element: <AdminAddItems />
        },
        {
          path: "list", element: <AdminListItems />
        },
        {
          path: "orders", element: <Orders />
        }

      ]
    },
    {
      path: "/login",
      element: (
        <Login />
      )
    },
    {
      path: "/signup",
      element: (
        <Signup />
      )
    }

  ])


  return (
    <>

      <div>
        <Toaster />
      </div>
      <RouterProvider router={router} />
    </>
  )
}

export default App
