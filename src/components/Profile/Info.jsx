import React from 'react'
import { useContext } from "react"
import { UserContext } from "../context/user"
import './pro.css'

export default function Info() {
  const {isLogin,userData,setIsLogin,setUserData}=useContext(UserContext);
console.log(userData);
  return (
    <div className='d-flex flex-column gap-4 proFont align-items-center'>
      <h3>User Name</h3>
      <h5>{userData.userName}</h5>
      <h3>User Rule </h3>
      <h5>{userData.role}</h5>

    </div>
  )
}
