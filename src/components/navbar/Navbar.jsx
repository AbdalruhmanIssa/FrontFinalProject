import { useContext } from "react"
import { Link,useNavigate } from 'react-router-dom'
import { UserContext } from "../context/user"
import styles from './nav.module.css'
import  './nav.css'
import logo from '../../assets/logo.png'
export default function Navbar() {
  const {isLogin,userData,setIsLogin,setUserData}=useContext(UserContext);


 const navigate = useNavigate();
  function handelLogout() {
    localStorage.removeItem("userToken");
    setIsLogin(false);
    setUserData({});
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg shadow  bg-white fixed-top pt-3 ">
  <div className="container mb-3">
    <img src={logo} alt="..." className={styles.img} />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse justify-content-center  gap-3" id="navbarNav">
      <ul className="navbar-nav gap-3">
        {
        isLogin?
        <>
        
        <li className="nav-item ">
          <a className="nav-link active"  aria-current="">Welcome <span className={styles.span}>{userData.userName}</span></a>
        </li>
        <li className="nav-item ">
          <Link className="nav-link "  aria-current="page"to={'/'}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"to={'/category'}>Categoreis</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"to={'/pro'}>Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"to={'/cart'}><i class="bi bi-bag"></i></Link>
        </li>
        <li className="nav-item d-flex align-items-center">
  <div className="dropdown">
    <button className="btn border-0 profile-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i className="bi bi-person" />
    </button>
    <ul className="dropdown-menu">
      <li><a className="dropdown-item" onClick={handelLogout}>Logout</a></li>
      <li><Link className="dropdown-item" to={'/profile'}>Profile</Link></li>
    </ul>
  </div>
</li>



        
        </>
        
        :
        <>
        <li className="nav-item ">
          <a className="nav-link active"  aria-current="">Welcome <span className={styles.span}>{userData.userName}</span></a>
        </li>
        <li className="nav-item ">
          <Link className="nav-link "  aria-current="page"to={'/'}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"to={'/category'}>Category</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"to={'/pro'}>Products</Link>
        </li>
        <li className="nav-item d-flex align-items-center">
  <div className="dropdown">
    <button className="btn border-0 profile-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i className="bi bi-person" />
    </button>
    <ul className="dropdown-menu">
      <li><Link className="dropdown-item" to={'/register'}>Register</Link></li>
      <li><Link className="dropdown-item" to={'/login'}>Login</Link></li>
    </ul>
  </div>
</li>


        </>
        
}
      </ul>
    </div>
  </div>
</nav>

  )
}
