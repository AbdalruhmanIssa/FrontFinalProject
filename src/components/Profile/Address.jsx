import Loader from '../loader/Loader';
import { useState, useEffect } from "react";
import axios from "axios";
import './pro.css';

export default function Address() {
  const [orders, setOrders] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  const getOrders = async () => {
    try {
      const token = localStorage.getItem('userToken'); // Retrieving token from localStorage
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/order`, {
        headers: {
          Authorization: `Tariq__${token}`, // Using the Bearer token for authorization
        }
      });
      
      if (data.orders && data.orders.length > 0) {
        setOrders(data.orders[0]); // Set orders if there is data
      } else {
        setOrders(null); // Set to null if no orders
      }
      setError(null); // Clear any previous error
    } catch (err) {
      console.error(err);
      setError("Error happened");
    } finally {
      setLoader(false); // Hide loader in all cases
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className='d-flex flex-column gap-4 align-items-center proFont'>
      {loader && <Loader />}
      
      {error ? (
        <div className='vh-100 d-flex justify-content-center align-items-center'>{error}</div>
      ) : (
        <>
          {orders ? (
            <>
              <h3>Your Address</h3>
              <h5>{orders.address}</h5>
              <h3>Your Phone Number</h3>
              <h5>{orders.phoneNumber}</h5>
            </>
          ) : (
            <div className='vh-100 d-flex justify-content-center align-items-center'>Still nothing</div>
          )}
        </>
      )}
    </div>
  );
}
