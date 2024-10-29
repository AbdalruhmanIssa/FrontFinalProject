import React from 'react'
import Loader from '../loader/Loader';
import {  useState,useEffect } from "react"
import axios from "axios"

export default function Useful() {
    const [mesh,setMesh]=useState([]);
    const [loader,setLoader]=useState(true);
    const [error,setError]=useState(null);  
    const getMesh = async ()=>{

        try{
const token = localStorage.getItem('userToken'); // Retrieving token from localStorage
const {data}=await axios.get(`https://ecommerce-node4.onrender.com/order`,{headers: 
  {
  Authorization:
   `Tariq__${token}`, // Using the Bearer token for authorization
         } },);
setLoader(false);
setError(null);
console.log(data);

}
catch(err){
  console.log(err)
    setError("roor");
    setLoader(false);
    }
finally{
    setLoader(false);
}

}
useEffect(()=>{
  getMesh();
}

,[])
  return (
    <div>
    {mesh.map(product => 

      <div></div>
    )}
    </div>
  )
}
