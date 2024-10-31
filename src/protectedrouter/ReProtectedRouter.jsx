import React, { Children } from 'react'
import { Navigate } from 'react-router-dom';
import { toast,Slide } from 'react-toastify';

export default function ReProtectedRouter({children}) {
    const token=localStorage.getItem('userToken');
    if(token){
      toast.error("Cant Acsses!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
       return <Navigate to='/' />
    }
   
  return children;
  
}
