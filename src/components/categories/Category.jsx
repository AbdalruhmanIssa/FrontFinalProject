import React from 'react'
import Header from '../header/Header'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../products/Product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import './categories.css'
import axios from 'axios';
import Loader from '../loader/Loader';

export default function Category() {
  const [products,setProducts]=useState([]);
    const [loader,setLoader]=useState(true);
    const [error,setError]=useState(null);

    const getProducts  = async ()=>{
        try{
const {data}=await axios.get('https://ecommerce-node4.onrender.com/products?page=1&limit=10');
setProducts(data.products);
setLoader(false);
setError(null);
console.log(data.products)
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
  ,[]);
  if(loader){
    return(<Loader />)
    }
  return (
    <>

    <div className='text-center mt-5  pros'>
  <Header title="categories" />
      
    <h1>Toys & Games</h1>
    {error?<div className='vh-100 d-flex justify-content-center align-items-center'>{error}</div>:null}

       <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={-10}
    slidesPerView={3}
    navigation
    pagination={{ clickable: true  }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}

 >
 {
 products.map((product,index) => (
  <div key={index}>
    {index<=(((products.length)/2)-1)?
   <SwiperSlide  >
    
      <div className="container d-flex justify-content-center  align-items-center mt-5 mb-5 pro"  >
<Link key={product._id} to={`/product/${product._id}`} className=''>
        

          <img src={product.mainImage.secure_url} alt={product.name} className='w-75 ' />
      <h5 className='h5'>{product.name.substring(0,20)}</h5>
    </Link>
        
      </div>

   </SwiperSlide>:null}
   </div>

))}

   
 </Swiper>
    </div>
    <div className='text-center mt-5  pros'>
      
    <h1>Mobiles</h1>
    {error?<div className='vh-100 d-flex justify-content-center align-items-center'>{error}</div>:null}

       <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={-10}
    slidesPerView={3}
    navigation
    pagination={{ clickable: true  }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}

 >
 {
 products.map((product,index) => (
  <div key={index}>
    {index>(((products.length)/2)-1)?
   <SwiperSlide  >
    
      <div className="container d-flex justify-content-center  align-items-center mt-5 mb-5 pro"  >
<Link key={product._id} to={`/product/${product._id}`} className=''>
        

          <img src={product.mainImage.secure_url} alt={product.name} className='w-75 ' />
      <h5 className='h5'>{product.name.substring(0,20)}</h5>
    </Link>
        
      </div>

   </SwiperSlide>:null}
   </div>

))}

   
 </Swiper>
 
    </div>
    


   

  
    </>
  )
}
