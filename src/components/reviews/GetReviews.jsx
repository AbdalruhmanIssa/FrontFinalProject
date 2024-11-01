import Loader from '../loader/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function GetReviews() {
    const [review,setReview]=useState({});
      const [loader,setLoader]=useState(true);
      const [error,setError]=useState(null);
      const {productId}=useParams();
    const getReview  = async ()=>{
        try{
const {data}=await axios.get(`https://ecommerce-node4.onrender.com/products/${productId}/review`,
     {
            headers: {
                Authorization: `Tariq__${token}`, // Using the Bearer token for authorization
              }
        }
);
setLoader(false);
setError(null);
console.log(data);

}
catch(err){
    setError("Somthing is wrong");
    setLoader(false);
    }
finally{
    setLoader(false);
}
useEffect(()=>{
    getReview();
}

,[])
}
  return (
    <div>
      
    </div>
  )
}
