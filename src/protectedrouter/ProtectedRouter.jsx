import React, { Children } from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRouter({children}) {
    const token=localStorage.getItem('userToken');
    if(!token){
       return <Navigate to='/login' />
    }
  return children;
  
}
