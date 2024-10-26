import Loader from '../loader/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../header/Header';

import { Link } from 'react-router-dom';

export default function Cart() {
    
    const [cart,setCart]=useState([]);
      const [loader,setLoader]=useState(true);
      const [error,setError]=useState(null);  
      const [updating, setUpdating] = useState(false);
      let num=1; 
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
  console.log(data);
  


  }
  catch(err){
      setError(error.response.data.message);
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
        setCart(itemId);
        setError(null);
        setLoader(false);
        window.location.reload();
    } catch (err) {
        setError(err.response.data.message);
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
        setError("bnbn");
        setLoader(false);
        setUpdating(false);

    }
    finally{
        setLoader(false);
    }
  };

  const decreaseQuantity = async (itemId) => {
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

  const addToCart = async () => {
    const token = localStorage.getItem('userToken'); // Retrieving token from localStorage
    setLoader(true);
    try {
      const { data } = await axios.post(
        'https://ecommerce-node4.onrender.com/order'
        
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
        toast.success('It!', {
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
  
    
  return (

<section>
    {loader?<Loader />:null}
{error?<div className='vh-100 d-flex justify-content-center align-items-center'>{error}</div>:null}
<Header title="Shoping Cart" />
<div className='vh-100 container'>
{cart.length === 0 ? (
                    // Show this message if the cart is empty
                    <div className="text-center">
                        <h3>Your cart is currently empty</h3>
                        <p>
                            Looks like you haven't added any items to your cart yet.
                        </p>
                        <Link to='/' className="btn btn-primary">
                            Go Back to Shop
                        </Link>
                    </div>
                ) : null}
<div className="card mb-3 border-0">
{cart.map( item =>
 
  <div className="row g-0 ">
    <div className="col-md-4">
      <img src={item.details.mainImage.secure_url} className="img-fluid rounded-start" alt="..." />
    </div>
    <div className="col-md-8  ">
      <div className="card-body d-flex flex-column gap-3">
        <h5 className="card-title">{item.details.name}</h5>
        <p className="card-text">{item.details.finalPrice}$</p>
        <p className="card-text">Total:{parseInt(item.details.finalPrice, 10)*parseInt(item.quantity, 10)}$</p>
        <section className=" d-flex flex-column align-items- justify-content-center ">
      <div className="mb-3 font">Quantity</div>
      <div className=" bg-light d-flex justify-content-between cus ">
      <button className="btn  text-center btn-secondary-subtle border-0 "  onClick={() =>increaseQuantity(item.productId)}>+</button>
      <span className="text-dark pt-1 text-center ">{item.quantity}</span>
      <button className="btn  btn-secondary-subtle border-0 text-center"  onClick={() => decreaseQuantity(item.productId)} >-</button>
      </div>
    </section>
        <button
                                        className="btn btn-danger w-25"
                                        onClick={() => removeItem(item.productId)}
                                    >
                                        Remove Item
                                    </button>

      </div>
    </div>
  </div>
    )}
</div>

<div className="bton d-flex justify-content-center align-items-center mt-5">
<button className="btn btn-dark">Proced to cheacout</button>
</div>
</div>

</section>
  )
}
