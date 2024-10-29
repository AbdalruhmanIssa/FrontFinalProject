import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Products from '../../components/products/Products';
import Head from '../../components/header/Head';
import Categories from '../../components/categories/Categories';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import ProductsHome from '../../components/products/ProductsHome';
export default function Home() {
  
  return (
    <>
      <Head />

      <Categories />
     

     <ProductsHome />

  
    </>
  );
}
