import axios from "axios";
import { useFormik } from "formik"
import * as yup from 'yup'

export default function Register() {
  const schema =yup.object({
    userName: yup.string().min(5).max(10).required(),
    email: yup.string().required().min(10).email(),
    password: yup.string().required().min(7).max(25),
  });
    const formik = useFormik({
        initialValues:{
            userName:'',
            email:'',
            password:''
        },
        onSubmit:RegisterUser,
        validationSchema:schema
    }

    );
   async function  RegisterUser(){
const {data} =await axios.post(`https://ecommerce-node4.onrender.com/auth/signup`,formik.values);
console.log(data);
    }
    console.log(formik);
  return (
  <form onSubmit={formik.handleSubmit} className="d-flex flex-column justify-content-center align-items-center vh-100">
    <h1>Register</h1>
  <div className="mb-3 mt-4 w-25">
    <label htmlFor="username" className="form-label">User Name</label>
    <input type="text" className="form-control" id="username" placeholder=""
    onChange={formik.handleChange}
    name="userName"
    value={formik.userName} />
    {formik.touched.userName && formik.errors.userName ? <div className="alert alert-danger">{formik.errors.userName}</div>:null}
  </div>
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
  <button type="submit" className="btn btn-warning" >Register</button>
</form>

  )
}
