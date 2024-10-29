import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import './product.css'
export default function ProductsHome() {
    const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);  // State to hold the thumbs Swiper instance

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products?page=1&limit=10`);
      setProducts(data.products);
      setLoader(false);
      setError(null);
      console.log(data.products);
    } catch (err) {
      setError("An error occurred while fetching products");
      setLoader(false);
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const check = (i) =>{
if(products[i].finalPrice==products[i].price)
    return false;
return true;
  }


  return (
    <div className='text-center mt-5  pros'>
    <h1>SALES!</h1>
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
    {check(index)?
   <SwiperSlide  >
    
      <div className="container d-flex justify-content-center  align-items-center mt-5 mb-5 pro"  >
<Link key={product._id} to={`/product/${product._id}`} className=''>
        

          <img src={product.mainImage.secure_url} alt={product.name} className='w-75 ' />
      <h5 className='h5'>{product.name.substring(0,20)}</h5>
      <span className='span'>{product.discount}% off!!</span>
    </Link>
        
      </div>

   </SwiperSlide>:null}
   </div>

))}

   
 </Swiper>
    </div>
  )
}
