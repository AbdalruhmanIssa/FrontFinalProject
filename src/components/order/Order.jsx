import axios from "axios"
import { useFormik, yupToFormErrors } from "formik"
import * as yup from 'yup'
import { toast,Slide } from 'react-toastify';
import {  useState } from "react"
import Loader from '../loader/Loader';
import   './order.css'
export default function Order() {
    const [loader,setLoader]=useState(false);
    const [error,setError]=useState(null);  
    const schema =yup.object({
        address: yup.string().required().min(5),
        number: yup.number().required().min(10),
      });
    const formik = useFormik({
        initialValues:{
            address:'',
            number:''
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
      toast.error("something is wrong", {
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
        <form onSubmit={formik.handleSubmit} className="d-flex flex-column justify-content-start align-items-center gap-5 fonty text-center">
  <h1 className="">Create Order</h1>
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
    <label htmlFor="number" className="form-label">Phone number</label>
    <input type="tel" className="form-control" id="number" placeholder="" 
     onChange={formik.handleChange}
     name="number"
     value={formik.number}
     onBlur={formik.handleBlur}/>
    {formik.touched.number && formik.errors.number ? <div className="alert alert-danger">{formik.errors.number}</div>:null}
  </div>
  <button type="submit" className="btn btn-warning" >Order</button>


</form>
    </>
  )
}
