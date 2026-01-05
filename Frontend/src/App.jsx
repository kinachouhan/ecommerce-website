import './App.css'
import { createBrowserRouter , RouterProvider} from "react-router-dom";
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Cart } from './cart/Cart';
import { MainLayout } from './layout/MainLayout';
import { AdminLayout } from './layout/AdminLayout';
import { AdminHome } from './pages/AdminHome';
import { AdminAddItems } from './pages/AdminAddItems';
import { AdminListItems } from './pages/AdminListItems';
import { Orders } from './pages/Orders';
import {Toaster} from "react-hot-toast"
import { SingleProductDetails } from './pages/SingleProductDetails';
import { Checkout } from './pages/Checkout';

function App() {

  const router = createBrowserRouter([
     {
       path: "/",
       element: <MainLayout/>,
       children: [
        {
           index: true, element: <Home/>,
        },
        {
          path: "/collection" , element: <Collection/>
        },
        {
          path: "/about" , element: <About/>
        },
        {
          path: "/contact", element: <Contact/>
        },
        {
          path:"/cart" , element: <Cart/>
        },
        {
          path:"/checkout" , element: <Checkout/>
        },
        {
          path:"/product/:id" , element: <SingleProductDetails/>
        }
       ]
     },
     {
       path: "/admin",
       element: <AdminLayout/>,
       children: [
      
        {
          index: true , element: <AdminAddItems/>
        },
        {
          path: "list" , element: <AdminListItems/>
        },
        {
          path: "orders", element: <Orders/>
        }
       
       ]
     },
     {
      path: "/login",
      element: (
        <Login/>
      )
     },
     {
      path: "/signup",
      element: (
        <Signup/>
      )
     }
    
  ])
  

  return (
    <>
  
     <div>
       <Toaster/>
     </div>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
 