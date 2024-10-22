import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
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
    setError("non");
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

   <Swiper
   spaceBetween={50}
   slidesPerView={3}
   onSlideChange={() => console.log('slide change')}
   onSwiper={(swiper) => console.log(swiper)}
 >   {categories.map(category => (
   <SwiperSlide key={category._id}>
<Link  to={`/categoryDetails/${category._id}`}>
      <div className="category">
        {category.image && category.image.secure_url ? (
          <img src={category.image.secure_url} alt={category.name} />
        ) : (
          <p>No image available</p>
        )}
      </div>
    </Link>

   </SwiperSlide>))}

   ...
 </Swiper>
  )
}
