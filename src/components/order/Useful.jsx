
import Loader from '../loader/Loader';
import {  useState,useEffect } from "react"
import axios from "axios"
import Address from '../Profile/Address';

export default function Useful() {
    const [orders,setOrders]=useState([]);
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
         setOrders(data.orders);
setLoader(false);
setError(null);
console.log(data.orders);

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
  <div className=''>
{loader?<Loader />:null}
{error?<div className='vh-100 d-flex justify-content-center align-items-center'>{error}</div>:null}
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Total Price</th>
      <th scope="col">Payment Method</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    {orders.map(order =>

    <tr>
      <th scope="row">{order._id.substring(0,3)}</th>
      <td>{order.createdAt.substring(0,10)}</td>
      <td>{order.finalPrice}</td>
      <td>{order.paymentType}</td>
      <td>{order.status}</td>
    </tr>
   
   )}

    
  </tbody>
</table>




  </div>
  )
}
