import axios from "axios"
import { useFormik, yupToFormErrors } from "formik"
import * as yup from 'yup'
import { toast,Slide } from 'react-toastify';
import {  useState } from "react"
import Loader from '../loader/Loader';
import Header from "../header/Header";
import { useParams } from 'react-router-dom';

export default function Reviews() {
    const [loader,setLoader]=useState(false);
    const [error,setError]=useState(null);  
    const {productId}=useParams();

    const schema =yup.object({
        comment: yup.string().required(),
        rating: yup.number().required().min(1),
      });
    const formik = useFormik({
        initialValues:{
            comment:'',
            rating:''
        },
        onSubmit:OrderPlace,
      validationSchema:schema
    }
    );
    async function OrderPlace(){
        setLoader(true);
        try{
        const token = localStorage.getItem('userToken');

    const {data} =await axios.post(`https://ecommerce-node4.onrender.com/products/${productId}/review`,formik.values,
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
    <Header title='Your Review' sec='we appritaite taking from ypur time to give a review'  />
    {loader?<Loader />:null}
    {error?<div className='vh-100 d-flex justify-content-center align-items-center '>{error}</div>:null}
    
        <form onSubmit={formik.handleSubmit} className="d-flex flex-column justify-content-start align-items-center  gap-5 fonty text-center">
  <h1 className="">Review</h1>
  <div className="mb-3 w-25">
    <label htmlFor="comment" className="form-label ">Add a comment</label>

    <input type="text" className="form-control" id="comment" placeholder=""
     onChange={formik.handleChange}
     name="comment"
     value={formik.comment} 
     onBlur={formik.handleBlur}/>
    {formik.touched.comment && formik.errors.comment ? <div className="alert alert-danger">{formik.errors.comment}</div>:null}
  </div>
  <div className="mb-3 w-25">
    <label htmlFor="rating" className="form-label">Rating</label>
    <input type="number" className="form-control" id="rating" placeholder="" 
     onChange={formik.handleChange}
     name="rating"
     value={formik.rating}
     onBlur={formik.handleBlur}/>
    {formik.touched.rating && formik.errors.rating ? <div className="alert alert-danger">{formik.errors.rating}</div>:null}
  </div>
  <button type="submit" className="btn btn-warning " >Submit</button>


</form>
    </>
  )
}
