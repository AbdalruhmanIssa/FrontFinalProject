import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import './categories.css'
import Category from './Category';


export default function Categories() {
    const [categories,setCategories]=useState([]);
    const [loader,setLoader]=useState(true);
    const [error,setError]=useState(null);

    const getCategories  = async ()=>{
        try{
const {data}=await axios.get('https://ecommerce-node4.onrender.com/categories/active?page=1&limit=6');
setCategories(data.categories);
setLoader(false);
setError(null);

}
catch(err){
    setError("page not found");
    setLoader(false);
    }
finally{
    setLoader(false);
}

}

    useEffect(()=>{
        getCategories();
    }

)
if(loader){
return(<Loader />)
}

  return (
<div className='text-center mt-5 cat'>
  <h1>Shop by categories</h1>
   <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={-10}
    slidesPerView={3}
    navigation
    pagination={{ clickable: true  }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}

 >
        {error?<div className='vh-100 d-flex justify-content-center align-items-center'>{error}</div>:null}
 {
 categories.map(category => (
  <div >
   <SwiperSlide  >
    
      <div className="container d-flex justify-content-center align-items-center mt-5 mb-5">
<Link key={category._id} to={`/categoryDetails/${category._id}`} className=''>
        

          <img src={category.image.secure_url} alt={category.name} className='w-75 category' />
      
    </Link>
        
      </div>

   </SwiperSlide>
   </div>))}

   
 </Swiper>
 </div>
  )
}
