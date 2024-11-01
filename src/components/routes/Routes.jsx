  import Home from "../../pages/home/Home"
  import Login from "../Login"
  import Register from "../Register"
  import Root from "../Root"
  import ProtectedRouter from "../../protectedrouter/ProtectedRouter";
  import { createBrowserRouter } from 'react-router-dom';
import React from 'react'
import Categories from "../categories/Categories"
import Products from "../products/Products";
import CategoryDetails from "../CategoryDetails/CategoryDetails";
import Product from "../products/Product";
import ProductsDisplay from "../products/ProductsDisplay";
import ProductDetails from "../products/ProductDetails";
import Counter from "../counter/Counter";
import Choose from '../choose/Choose'
import Cart from "../Carts/Cart";
import Order from "../order/Order";
import Useful from "../order/Useful";
import ProductsHome from "../products/ProductsHome";
import Profile from "../Profile/Profile";
import Address from "../Profile/Address";
import Forget from "../Forget";
import NewPassword from "../NewPassword";
import Category from "../categories/Category";
import Reviews from "../reviews/Reviews";
import ReProtectedRouter from "../../protectedrouter/ReProtectedRouter";

import Noth from "../Noth";
const router = createBrowserRouter([
    {
      path: "/",
      element:<Root />,
      children: [
        {
          path: "/",
          element: <Home />
          
        },
        {
          path: "/login",
          element:
        <ReProtectedRouter>
          <Login />
          </ReProtectedRouter>

        },
        {
          path: "/register",
          element: 
          <ReProtectedRouter>
          <Register />
          </ReProtectedRouter>
         
          
        },
          {
            path:"/categorydetails/:categoryId",
            element:<CategoryDetails />
          },
          {
            path:"/product/:productId",
            element:<Product />
          },
          {
            path:"/cart",
            element:
            <ProtectedRouter>        
                  <Cart />
            </ProtectedRouter>

          }, 
          {
            path:"/profile",
            
           element:
           <ProtectedRouter>
           <Profile />
           </ProtectedRouter>

          },{
            path:"/forgetpassword",
            element:<Forget />
          },
          {
            path:"/newpassword",
            element:<NewPassword />
          },
          {
            path:"/category",
            element:<Category />
          },{
            path:"/pro",
            element:<ProductDetails />
          },
          {
            path:"/products/reviews/:productId",
            element:<Reviews />
          },{
            path:"/noth",
            element:<Noth />
          },
      ],
    },
  ]);
  export  default  router;