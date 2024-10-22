  import Home from "../../pages/home/Home"
  import Login from "../Login"
  import Register from "../Register"
  import Root from "../Root"
  import ProtectedRouter from "../../protectedrouter/ProtectedRouter";
  import { createBrowserRouter } from 'react-router-dom';
import React from 'react'
import Categories from "../categories/Categories"
import Products from "../products/Products";
const router = createBrowserRouter([
    {
      path: "/",
      element:<Root />,
      children: [
        {
          path: "/",
          element: 
          <ProtectedRouter>
          <Home />
          </ProtectedRouter>
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
          }
      ],
    },
  ]);
  export  default  router;