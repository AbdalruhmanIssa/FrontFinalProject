import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserContextProvider from "./components/context/user";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import router from "./components/routes/Routes";
export default function App() {


  return (
    <UserContextProvider>
<ToastContainer />
      <RouterProvider router={router}/> 
    </UserContextProvider>
  );
}
