import Loader from '../loader/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../header/Header';
import ProductsDisplay from '../products/ProductsDisplay';
export default function CategoryDetails() {
    const [products,setProducts]=useState([]);
    const [loader,setLoader]=useState(true);
    const [error,setError]=useState(null);
    const {categoryId}=useParams();
    console.log(categoryId);
    const getProducts  = async ()=>{
        try{
  const token = localStorage.getItem('userToken'); // Retrieving token from localStorage

const {data}=await axios.get(`https://ecommerce-node4.onrender.com/products/category/${categoryId}`);
setProducts(data.products);
setLoader(false);
setError(null);
console.log(data.products);
}
catch(err){
    setError("somthing went wrong...");
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
<div>


    <Header title="Category's Products" />
    {error?<div className='vh-100 d-flex justify-content-center align-items-center'>{error}</div>:null}
    
    <section className='products container '>
           <div className="row  ">
      {products.map(product =>
          <ProductsDisplay image={product.mainImage.secure_url}  name={product.name} price={product.finalPrice} id={`/product/${product._id}`} />
    
    )}
           </div>
      
    </section>
    </div>
  );
  
}

