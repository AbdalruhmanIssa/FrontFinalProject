import axios from "axios"
import { useFormik, yupToFormErrors } from "formik"
import * as yup from 'yup'
import { toast,Slide } from 'react-toastify';
import {  useState } from "react"
import Loader from '../loader/Loader';
import   './order.css'
export default function Order({bla}) {
    const [loader,setLoader]=useState(false);
    const [error,setError]=useState(null);  
    const schema =yup.object({
        address: yup.string().required().min(5),
        phone: yup.number().required().min(10),
      });
    const formik = useFormik({
        initialValues:{
          couponName:'',  
          address:'',
            phone:'',
           
        },
        onSubmit:OrderPlace,
      validationSchema:schema
    }
    );
    async function OrderPlace(){
        setLoader(true);
        try{
        const token = localStorage.getItem('userToken');

    const {data} =await axios.post(`https://ecommerce-node4.onrender.com/order/`,formik.values,
        {
            headers: {
                Authorization: `Tariq__${token}`, // Using the Bearer token for authorization
              }
        }
        
    );
    console.log(data);
    setLoader(false);
    setError(null);
    if(data.message=='success'){
      toast.success('Order Successed!', {
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
    }}
    
    catch(error){
      toast.error("something is wrong with order", {
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
    finally{
        setLoader(false);
    }
        }



  return (
    <>
    {loader?<Loader />:null}
    {error?<div className='vh-100 d-flex justify-content-center align-items-center '>{error}</div>:null}
        <form onSubmit={formik.handleSubmit} className="d-flex flex-column justify-content-start align-items-center  gap-5 fonty text-center">
  <h1 className="">Create Order</h1>
  <div className="mb-3 w-25">
    <label htmlFor="couponName" className="form-label">Coupon Name</label>
    <input type="text" className="form-control" id="couponName" placeholder="" 
     onChange={formik.handleChange}
     name="couponName"
     value={formik.couponName}
     onBlur={formik.handleBlur}/>
    {formik.touched.couponName && formik.errors.couponName ? <div className="alert alert-danger">{formik.errors.couponName}</div>:null}
  </div>
  <div className="mb-3 w-25">
    <label htmlFor="address" className="form-label ">Address</label>

    <input type="text" className="form-control" id="address" placeholder=""
     onChange={formik.handleChange}
     name="address"
     value={formik.address} 
     onBlur={formik.handleBlur}/>
    {formik.touched.address && formik.errors.address ? <div className="alert alert-danger">{formik.errors.address}</div>:null}
  </div>
  <div className="mb-3 w-25">
    <label htmlFor="phone" className="form-label">Phone Number</label>
    <input type="tel" className="form-control" id="phone" placeholder="" 
     onChange={formik.handleChange}
     name="phone"
     value={formik.phone}
     onBlur={formik.handleBlur}/>
    {formik.touched.phone && formik.errors.phone ? <div className="alert alert-danger">{formik.errors.phone}</div>:null}
  </div>
  
  <h5 className=" ">Payment Method</h5> 
  <div className="mb-3 w-25 d-flex flex-column gap-3">
  <input type="radio" className="btn-check" name="options-base" id="option5" autoComplete="off" defaultChecked />
  <label className="btn " htmlFor="option5"><i class="bi bi-credit-card-fill"></i>  Visa</label>
  <input type="radio" className="btn-check" name="options-base" id="option6" autoComplete="off" />
  <label className="btn" htmlFor="option6"><i class="bi bi-apple"></i> Apple Pay</label>
  <input type="radio" className="btn-check" name="options-base" id="option8" autoComplete="off" />
  <label className="btn" htmlFor="option8"><i class="bi bi-cash"></i> Cash</label>
</div>
<a className="text-dark "> Total Price: <span className="text-success w-25">{bla}$</span></a>
  <button type="submit" className="btn btn-warning " >Cheackout</button>


</form>
    </>
  )
}
