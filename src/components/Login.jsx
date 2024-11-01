import axios from "axios"
import { useFormik, yupToFormErrors } from "formik"
import * as yup from 'yup'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { UserContext } from "./context/user"
import { toast,Slide } from 'react-toastify';
import { Link } from "react-router-dom"
import Loader from "./loader/Loader"
export default function Login() {
const {setIsLogin,setUserData}=useContext(UserContext);
const [loader,setLoader]=useState(false);
const [errorMessage,setErrorMessage]=useState("");

  const navigate = useNavigate();
const schema =yup.object({
  email: yup.string().required().min(10).email(),
  password: yup.string().required().min(7).max(25),
});


    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        onSubmit:LoginUser,
      validationSchema:schema
    }
    );
   async function LoginUser(){
  setLoader(true);

    try{
const {data} =await axios.post(`https://ecommerce-node4.onrender.com/auth/signin`,formik.values);
console.log(data);

if(data.message=='success'){
  setLoader(false);
  localStorage.setItem("userToken",data.token);
  const decoded = jwtDecode(data.token);
  setUserData(decoded);
  setIsLogin(true);
  toast.success('Login Successfuly!', {
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
}}

catch(error){
  setLoader(false);
 
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
  <form onSubmit={formik.handleSubmit} className="d-flex flex-column justify-content-center align-items-center vh-100">
  <h1>Login</h1>
  <div className="mb-3 w-25">
    <label htmlFor="email" className="form-label">Email</label>

    <input type="text" className="form-control" id="email" placeholder=""
     onChange={formik.handleChange}
     name="email"
     value={formik.email} 
     onBlur={formik.handleBlur}/>
    {formik.touched.email && formik.errors.email ? <div className="alert alert-danger">{formik.errors.email}</div>:null}
  </div>
  <div className="mb-3 w-25">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="text" className="form-control" id="password" placeholder="" 
     onChange={formik.handleChange}
     name="password"
     value={formik.password}
     onBlur={formik.handleBlur}/>
    {formik.touched.password && formik.errors.password ? <div className="alert alert-danger">{formik.errors.password}</div>:null}
  </div>
  <div className="mb-3 w-25">
    <Link to={'/forgetpassword'}>Forgot Your Password?</Link>
  </div>
  <button type="submit" className="btn btn-warning" >Login</button>
 {errorMessage? <div className="alert alert-danger mt-5">{errorMessage}</div>:null}

</form>
</>
  )
}
