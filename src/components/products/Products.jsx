import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Product from './Product'
import Loader from '../loader/Loader';
export default function Products() {
    const [products,setProducts]=useState([]);
    const [loader,setLoader]=useState(true);
    const [error,setError]=useState(null);

    const getProducts  = async ()=>{
        try{
const {data}=await axios.get('https://ecommerce-node4.onrender.com/products?page=1&limit=10');
setProducts(data.products);
setLoader(false);
setError(null);

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
        getProducts();
    }

)
if(loader){
return(<Loader />)
}
  return (
    <section className='products py-5'>
        {error?<div className='aler alert-danger'>{error}</div>:null}
    <div className='row'>
      {products.map(product => (
        <div className='col-lg-4 mb-4' key={product.id}>
          <Product image={product.mainImage.secure_url} des={product.description} title={product.title} price={product.price} />
        </div>
      ))}
    </div>
  </section>
  
  )
}
