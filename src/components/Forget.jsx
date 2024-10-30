import axios from "axios"
import { useFormik, yupToFormErrors } from "formik"
import * as yup from 'yup'
import { useState } from "react"
import { toast,Slide } from 'react-toastify';
import { Link } from "react-router-dom"
import Loader from "./loader/Loader";
import { useNavigate } from "react-router-dom"

export default function Forget() {
  const navigate = useNavigate();

    const [loader,setLoader]=useState(false);
    const [error,setError]=useState(null);  
    const schema =yup.object({
        email: yup.string().required().min(10).email()
      });
    const formik = useFormik({
        initialValues:{
            email:'',
            
        },
        onSubmit:Forgot,
      validationSchema:schema
    }
    );
    async function Forgot(){
        setLoader(true);
        try{
    const {data} =await axios.patch(`https://ecommerce-node4.onrender.com/auth/sendcode`,formik.values);
    console.log(data);
    setLoader(false);
    setError(null);
    if(data.message=='success'){
      toast.success('Code Sent!', {
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
  navigate("/newpassword");

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
    <div>
        {loader?<Loader />:null}
      <form onSubmit={formik.handleSubmit} className="d-flex flex-column justify-content-center align-items-center vh-100">
  <h1>Please enter ur email</h1>
  <div className="mb-3 w-25">
    <label htmlFor="email" className="form-label"></label>

    <input type="text" className="form-control" id="email" placeholder=""
     onChange={formik.handleChange}
     name="email"
     value={formik.email} 
     onBlur={formik.handleBlur}/>
    {formik.touched.email && formik.errors.email ? <div className="alert alert-danger">{formik.errors.email}</div>:null}
  </div>
  <button type="submit" className="btn btn-warning" >Send Code</button>
 {error? <div className="alert alert-danger mt-5">{error}</div>:null}

</form>
    </div>
  )
}
