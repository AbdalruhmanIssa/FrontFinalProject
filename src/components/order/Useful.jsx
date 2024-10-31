import Loader from '../loader/Loader';
import { useState, useEffect } from "react";
import axios from "axios";
import Address from '../Profile/Address';
import { Link } from 'react-router-dom';
import Reviews from '../reviews/Reviews';

export default function Useful() {
  const [orders, setOrders] = useState([]);
  const [pro, setPro] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);  

  const getOrders = async () => {
    try {
      const token = localStorage.getItem('userToken'); // Retrieving token from localStorage
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/order`, {
        headers: {
          Authorization: `Tariq__${token}`, // Using the Bearer token for authorization
        },
      });
      setOrders(data.orders);

      // Extract products from each order
      const allProducts = data.orders.flatMap(order => order.products);
      setPro(allProducts); // Setting all products in the `pro` state

      setLoader(false);
      setError(null);
      console.log(data.orders);
    } catch (err) {
      console.log(err);
      setError("Error happened");
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div>
      {loader ? <Loader /> : null}
      {error ? <div className='vh-100 d-flex justify-content-center align-items-center'>{error}</div> : null}
      
      {/* Orders Table */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Total Price</th>
            <th scope="col">Payment Method</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <th scope="row">{index + 1}</th>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.finalPrice}</td>
              <td>{order.paymentType}</td>
              <td>{order.status || "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Products Table */}
      <h3 className='proFont'>Your Purchases</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Final Price</th>
            <th scope="col">Give a review</th>

          </tr>
        </thead>
        <tbody>
          {pro.map((product, index) => (
            <tr key={product._id}>
              <td>{product.productId.name.substring(0,30)}</td> {/* Accessing name of productId */}
              <td>{product.quantity}</td>
              <td>{product.unitPrice}$</td>
              <td>{product.finalPrice}$</td>
              <td><Link className='btn btn-warning' to={`/products/reviews/${product.productId._id}`}>review it!</Link></td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
