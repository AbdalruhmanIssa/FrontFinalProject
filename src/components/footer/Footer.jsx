import { useContext } from "react"

import logo from '../../assets/logo.png';
import './footer.css'
import { UserContext } from "../context/user"

export default function Footer() {
  const {isLogin,userData,setIsLogin,setUserData}=useContext(UserContext);

  return (
    <footer className="footer bg-light text-dark py-5 ">
      <div className="container">
        <div className="row">
          
          {/* Contact Info Section */}
          <div className="col-md-3 mb-4">
            <img src={logo} alt="ecomus logo" className="mb-3" style={{ width: '120px' }} />
            <p className="mb-1 side">Address: 1234 Fashion Street, Suite 567,<br />New York, NY 10001</p>
            <p className="mb-1 side">Email: <a href="mailto:info@fashionshop.com" className="text-dark">info@fashionshop.com</a></p>
            <p className="mb-1 side">Phone: <a href="tel:+12125551234" className="text-dark">(212) 555-1234</a></p>
            <a href="#" className="text-dark d-block mb-3">Get direction <span>↗</span></a>
            <div className="d-flex gap-2">
              <a href="#" className="btn btn-outline-dark btn-sm rounded-circle" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="btn btn-outline-dark btn-sm rounded-circle" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="btn btn-outline-dark btn-sm rounded-circle" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="btn btn-outline-dark btn-sm rounded-circle" aria-label="TikTok">
                <i className="bi bi-tiktok"></i>
              </a>
            </div>
          </div>

          {/* Help Links Section */}
          <div className="col-md-3 mb-4">
            <h5 className="mb-3  foot">Help</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark d-block">Privacy Policy</a></li>
              <li><a href="#" className="text-dark d-block">Returns + Exchanges</a></li>
              <li><a href="#" className="text-dark d-block">Shipping</a></li>
              <li><a href="#" className="text-dark d-block">Terms & Conditions</a></li>
              <li><a href="#" className="text-dark d-block">FAQ's</a></li>
              <li><a href="#" className="text-dark d-block">Compare</a></li>
              <li><a href="#" className="text-dark d-block">My Wishlist</a></li>
            </ul>
          </div>

          {/* Useful Links Section */}
          <div className="col-md-3 mb-4">
            <h5 className="mb-3  foot">Useful Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark d-block">Our Story</a></li>
              <li><a href="#" className="text-dark d-block">Visit Our Store</a></li>
              <li><a href="#" className="text-dark d-block">Contact Us</a></li>
              <li><a href="#" className="text-dark d-block">Account</a></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-3 mb-4">
          <a className="foot text-dark"  aria-current="">WELLCOME <span >{userData.userName}</span></a>

            <ul className="list-unstyled">
              
              <li><a href="#" className="text-dark d-block">Home</a></li>
              <li><a href="#" className="text-dark d-block">Category</a></li>
              <li><a href="#" className="text-dark d-block">Products</a></li>
              <li className="d-flex align-items-center">
                <a href="#" className="text-dark me-2"><i className="bi bi-bag"></i></a>
                <a href="#" className="text-dark"><i className="bi bi-person"></i></a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
