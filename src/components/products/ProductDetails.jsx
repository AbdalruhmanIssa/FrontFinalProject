import Loader from '../loader/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
export default function ProductDetails() {
    const [product,setProduct]=useState({});
    const [loader,setLoader]=useState(true);
    const [error,setError]=useState(null);
    const {productId}=useParams();

    const getProduct  = async ()=>{
        try{
const {data}=await axios.get(`https://ecommerce-node4.onrender.com/products/"66fb86a741aba231158e3b51"`);
setProduct(data.product);
setLoader(false);
setError(null);
console.log(data.product);
}
catch(err){
    setError("non");
    setLoader(false);
    }
finally{
    setLoader(false);
}

}

    useEffect(()=>{
        getProduct();
    }

,[])
if(loader){
return(<Loader />)
}
  return (
    <div className='d-flex flex-column'>
    
    </div>
  )
}
