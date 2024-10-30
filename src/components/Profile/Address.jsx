import Loader from '../loader/Loader';
import {  useState,useEffect } from "react"
import axios from "axios"
import './pro.css'
export default function Address() {
    const [orders,setOrders]=useState({});
    const [loader,setLoader]=useState(true);
    const [error,setError]=useState(null);  
    const getOrders = async ()=>{

        try{
const token = localStorage.getItem('userToken'); // Retrieving token from localStorage
const {data}=await axios.get(`https://ecommerce-node4.onrender.com/order`,{headers: 
  {
  Authorization:
   `Tariq__${token}`, // Using the Bearer token for authorization
         } },);
         setOrders(data.orders[0]);
setLoader(false);
setError(null);
console.log(data.orders[0]);

}
catch(err){
  console.log(err)
    setError("Error happened");
    setLoader(false);
    }
finally{
    setLoader(false);
}

}
useEffect(()=>{
  getOrders();
}

,[])
  return (
    <div className='d-flex flex-column gap-4 align-items-center proFont'>
        {loader?<Loader />:null}
        {error?<div className='vh-100 d-flex justify-content-center align-items-center'>{error}</div>:null}
        <h3>Your Address</h3>
        <h5>{orders.address}</h5>
      <h3>Your Phone Number</h3>
      <h5>{orders.phoneNumber}</h5>

    </div>
  )
}
