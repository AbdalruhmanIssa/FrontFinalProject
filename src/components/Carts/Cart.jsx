import Loader from '../loader/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../header/Header';
import './cart.css'
import { Link } from 'react-router-dom';
import Order from '../order/Order';
import Footer from '../footer/Footer';

export default function Cart() {
    
    const [cart,setCart]=useState([]);

      const [loader,setLoader]=useState(true);
      const [error,setError]=useState(null);  
      const [updating, setUpdating] = useState(false);
let x=0;
      const getCart  = async ()=>{

          try{
  const token = localStorage.getItem('userToken'); // Retrieving token from localStorage
  const {data}=await axios.get(`https://ecommerce-node4.onrender.com/cart/`,{headers: 
    {
    Authorization:
     `Tariq__${token}`, // Using the Bearer token for authorization
           } },);
  setCart(data.products);
  setLoader(false);
  setError(null);
 console.log(data.products);
  }
  catch(err){
      setError("Something is wrong");
      setLoader(false);
      }
  finally{
      setLoader(false);
  }
  
  }
  const removeItem = async (itemId) => {
    setLoader(true);
    try {
        const token = localStorage.getItem('userToken');
        await axios.patch(
            `https://ecommerce-node4.onrender.com/cart/removeItem`,
            { productId: itemId }, // Sending the product ID to remove
            {
                headers: {
                    Authorization: `Tariq__${token}`, // Authorization token
                },
            }
        );
        // Update the state to reflect the changes
        getCart();
        setError(null);
        setLoader(false);
    } catch (err) {
        setError("Error");
  setLoader(false);

    }
    finally{
        setLoader(false);
    }
};


const increaseQuantity = async (itemId) => {
       setLoader(true);
    
    try {
   

        setUpdating(true); 
        
        const token = localStorage.getItem('userToken');
        await axios.patch(
            `https://ecommerce-node4.onrender.com/cart/incraseQuantity`,
            { productId: itemId },  // Sending the product ID
            {
                headers: {
                    Authorization: `Tariq__${token}`,  // Authorization token
                },
            }
        );
        // Refresh the cart after successful quantity increase
        
        setLoader(false);
        setError(null);
        getCart(); 
         // Option 1: Fetch the updated cart after increasing the quantity
        // Alternatively, you can use window.location.reload(); to refresh the entire page.
    } catch (err) {
        setError("somthing went wrong...");
        setLoader(false);
        setUpdating(false);

    }
    finally{
        setLoader(false);
    }
  };

  const decreaseQuantity = async (itemId,i) => {
    if(cart[i].quantity==1)return null;

    setLoader(true);
    try {
        const token = localStorage.getItem('userToken');
        await axios.patch(
            `https://ecommerce-node4.onrender.com/cart/decraseQuantity`,
            { productId: itemId },  // Sending the product ID
            {
                headers: {
                    Authorization: `Tariq__${token}`,  // Authorization token
                },
            }
        );
        // Refresh the cart after successful quantity decrease
        getCart();  // Option 1: Fetch the updated cart after decreasing the quantity
        setError(null);
        setLoader(false);
    } catch (err) {
        setError("error has accured");
        setLoader(false);

    }
    finally{
        setLoader(false);

    }
};
  
      useEffect(()=>{
          getCart();
      }
  
  ,[])

  const calculateTotalPrice = () => {
  return cart.reduce((total, item) => {
    return total + item.details.finalPrice * item.quantity;
  }, 0);
};

    
  return (

<section className=''>
<Header title="Shoping Cart" />

    {loader?<Loader />:null}
    {cart.length === 0 && !error  ? (
                    // Show this message if the cart is empty
                    <div className="text-center d-flex flex-column gap-3 align-items-center col-md-12">
                        <h3>Your cart is currently empty</h3>
                        <p>
                            Looks like you haven't added any items to your cart yet.
                        </p>
                        <Link to='/' className="btn btn-primary">
                            Go Back to Shop
                        </Link>
                    </div>
                ) : null}
                
{error?<div className='vh-100 d-flex justify-content-center align-items-center'>{error}</div>:null}
<div className=' container    d-flex flex-wrap'>

<div className="card mb-3  border-0 col-md-6">
{cart.map( (item,index) =>
  <div key={index} className="row g-0  border-bottom">
 
    <div className="col-md-1">
      <img src={item.details.mainImage.secure_url} className="img-fluid rounded-start" alt="..." />
    </div>
    <div className="col-md-6">
      <div className="card-body d-flex flex-column gap-3 bold">
        <h6 className="card-title fonte">{item.details.name}</h6>
        <p className="card-text ">{item.details.finalPrice}$</p>
        <p className="card-text ">subPrice:{parseInt(item.details.finalPrice, 10)*parseInt(item.quantity, 10)}$</p>
        <section className=" d-flex flex-column align-items- justify-content-center ">
      <div className="mb-3 font">Quantity:</div>
      <div className=" bg-light d-flex justify-content-between cus ">
      <button className="btn  text-center btn-secondary-subtle border-0 "  onClick={() =>increaseQuantity(item.productId)}>+</button>
      <span className="text-dark pt-1 text-center ">{item.quantity}</span>
      <button className="btn  btn-secondary-subtle  border-0 text-center"  onClick={() => decreaseQuantity(item.productId,index)} >-</button>
      </div>
    </section>
        <button
                                        className="btn btn-danger w-50"
                                        onClick={() => removeItem(item.productId)}
                                    >
                                        Remove Item
                                    </button>

      </div>
    </div>
   
  </div>
      )}
   
</div>
{cart.length>=1?(<div className="col-md-6">
    <Order bla={calculateTotalPrice()} />

      </div>):null
      }


</div>

</section>
  )
}
