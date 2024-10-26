import React, { Children } from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRouter({children}) {
    const token=localStorage.getItem('userToken');
    if(!token){
      toast.error(error.response.data.message, {
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
       return <Navigate to='/login' />
    }
  return children;
  
}
