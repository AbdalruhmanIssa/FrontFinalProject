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
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
            path: "/products",
            element: <Products />,
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
            path:"/counter",
            element:<Counter />
          },
          {
            path:"/choose",
            element:<Choose />
          },
          {
            path:"/cart",
            element:
            <ProtectedRouter>            <Cart />
            </ProtectedRouter>

          }, {
            path:"/order",
            element:<Order />
          },{
            path:"/useful",
           element:<Useful />
          },
          {
            path:"/productshome",
           element:<ProductsHome />
          },
      ],
    },
  ]);
  export  default  router;