import Loader from '../loader/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './product.css'
import Counter from '../counter/Counter'
import Choose from '../choose/Choose'
import { toast,Slide } from 'react-toastify';

export default function Product() {
  const [product,setProduct]=useState({});
  const [productImges,setProductImegs]=useState([]);
    const [loader,setLoader]=useState(true);
    const [error,setError]=useState(null);
    const {productId}=useParams();

    const getProduct  = async ()=>{
        try{
const {data}=await axios.get(`https://ecommerce-node4.onrender.com/products/${productId}`);
setProduct(data.product);
setLoader(false);
setError(null);
console.log(data.product);
setProductImegs(data.product.subImages);
}
catch(err){
    setError("crab");
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
const addToCart = async () => {
  const token = localStorage.getItem('userToken'); // Retrieving token from localStorage
  setLoader(true);
  try {
    const { data } = await axios.post(
      'https://ecommerce-node4.onrender.com/cart/'
      
      , // API endpoint for adding to the cart
      {
        productId: productId, // Assuming productId is defined elsewhere in the code
      },
      {
        headers: {
          Authorization: `Tariq__${token}`, // Using the Bearer token for authorization
        },
      }

    );
    if(data.message=='success'){
    setLoader(false);
      toast.success('Added secssufully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
      navigate("/");
    }
    console.log(data); // Logging the response from the server
  } catch (error) {
    setLoader(false);

    toast.error(error.response.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
      });
  }
};




if(loader){
return(<Loader />)
}

if(product.finalPrice==product.price){
  return (
    
    <section className='vh-100'>
{error?<div className='vh-100 d-flex justify-content-center align-items-center'>{error}</div>:null}
      <header className='h-25'></header>
      <div className='container'>
        
        <div className=' d-flex flex-wrap'>
          <div className='col-md-6 d-flex  justify-content-center align-items-center flex-column gap-5 mt-5 pt-5 '>
          {productImges.map(img=> <img src={img.secure_url} className='bigger w-50 '/>)}
          </div>
          
            <div className='col-md-6 d-flex justify-content-start align-items-center gap-5 text-center flex-column'>
          
          <h3 className="real ">{product.name}</h3>
          <p className=" text-secondary">{product.description.substring(0,40)}...</p>
         <div className="price d-flex justify-content-center a gap-5 ">
          <h5  className=" real text-success text-center">{product.finalPrice}$</h5>
         
            </div>
            <Choose />
    <Counter />
    <button className="btn btn-primary " onClick={addToCart}>Add to Cart</button>


      
          </div>
        </div>
      </div>
    </section>
  )
}
  return (
    <section className='vh-100'>
{error?<div className='vh-100 d-flex justify-content-center align-items-center'>{error}</div>:null}
      <header className='h-25'></header>
      <div className='container'>
        
        <div className=' d-flex flex-wrap'>
          <div className='col-md-6 d-flex  justify-content-center align-items-center flex-column gap-5 mt-5 pt-5 '>
          {productImges.map(img=> <img src={img.secure_url} className='bigger w-50 '/>)}
          </div>
          
            <div className='col-md-6 d-flex justify-content-start align-items-center gap-5 text-center flex-column'>
          
          <h3 className="real ">{product.name}</h3>
          <p className=" text-secondary">{product.description.substring(0,40)}...</p>
         <div className="price d-flex justify-content-center a gap-5 ">
          <p  className=" text-body-secondary text-decoration-line-through">{product.price}$</p>
          <h5  className=" real text-success text-center">{product.finalPrice}$</h5>
          <h5  className="dis">{product.discount}% off</h5>
            </div>
            <Choose />
    <Counter />
    <button className="btn btn-primary " onClick={addToCart}>Add to Cart</button>

      
          </div>
        </div>
      </div>
    </section>
  )
}
/*
<section className='vh-100 pt-5 mt-5 sec'>
  <div className="card h-100 border-0  container d-flex justify-content-center align-items-center gap-5" style={{maxWidth: 540}}>
    <div className="row g-0">
      
      <div className=" text-center">
        <div className="card-body">
          <h5 className="card-title ">{product.name}</h5>
          <p className="card-text text-secondary">{product.description.substring(0,40)}...</p>
         <div className="price d-flex justify-content-center gap-5 ">
          <p  className="card-text text-body-secondary text-decoration-line-through">{product.price}$</p>
          <h5  className="card-text real text-danger ">{product.finalPrice}$</h5>
          <h5  className="card-text   dis">{product.discount}% off</h5>

          </div>
        </div>
        <div className="d-flex d-flex justify-content-center align-items-center gap-5">
    {productImges.map(img=> <img src={img.secure_url} className='w-50 bigger'/>)}
      </div>
      <div className='d-flex flex-column gap-5 align-items-center mt-3'>
        <Choose />
    <Counter />
    <a className="btn btn-primary w-25">Add to Cart</a>

      </div>

      </div>
    </div>
  </div>
  </section>

*/