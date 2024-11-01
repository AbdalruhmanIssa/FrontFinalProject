import { useContext } from "react";
import logo from '../../assets/logo.png';
import './footer.css';
import { UserContext } from "../context/user";
import { Link } from "react-router-dom";

export default function Footer() {
  const { isLogin, userData, setIsLogin, setUserData } = useContext(UserContext);

  return (
    <footer className="footer bg-light text-dark py-5">
      <div className="container">
        <div className="row">

          {/* Contact Info Section */}
          <div className="col-md-3 mb-4">
            <img src={logo} alt="ecomus logo" className="mb-3" style={{ width: '120px' }} />
            <p className="mb-1 side">Address: 1234 Fashion Street, Suite 567,<br />New York, NY 10001</p>
            <p className="mb-1 side">Email: <a href="mailto:info@fashionshop.com" className="text-dark">info@fashionshop.com</a></p>
            <p className="mb-1 side">Phone: <a href="tel:+12125551234" className="text-dark">(212) 555-1234</a></p>
            <Link to={'/noth'} className="text-dark d-block mb-3">Get direction <span>↗</span></Link>
            <div className="d-flex gap-2">
              <Link to={'/noth'} className="btn btn-outline-dark btn-sm rounded-circle" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link to={'/noth'} className="btn btn-outline-dark btn-sm rounded-circle" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </Link>
              <Link to={'/noth'} className="btn btn-outline-dark btn-sm rounded-circle" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </Link>
              <Link to={'/noth'} className="btn btn-outline-dark btn-sm rounded-circle" aria-label="TikTok">
                <i className="bi bi-tiktok"></i>
              </Link>
            </div>
          </div>

          {/* Help Links Section */}
          <div className="col-md-3 mb-4">
            <h5 className="mb-3 foot">Help</h5>
            <ul className="list-unstyled">
              <li><Link to={'/noth'} className="text-dark d-block">Privacy Policy</Link></li>
              <li><Link to={'/noth'} className="text-dark d-block">Returns + Exchanges</Link></li>
              <li><Link to={'/noth'} className="text-dark d-block">Shipping</Link></li>
              <li><Link to={'/noth'} className="text-dark d-block">Terms & Conditions</Link></li>
              <li><Link to={'/noth'} className="text-dark d-block">FAQ's</Link></li>
              <li><Link to={'/noth'} className="text-dark d-block">Compare</Link></li>
              <li><Link to={'/noth'} className="text-dark d-block">My Wishlist</Link></li>
            </ul>
          </div>

          {/* Useful Links Section */}
          <div className="col-md-3 mb-4">
            <h5 className="mb-3 foot">Useful Links</h5>
            <ul className="list-unstyled">
              <li><Link to={'/noth'} className="text-dark d-block">Our Story</Link></li>
              <li><Link to={'/noth'} className="text-dark d-block">Visit Our Store</Link></li>
              <li><Link to={'/noth'} className="text-dark d-block">Contact Us</Link></li>
              <li><Link to={'/noth'} className="text-dark d-block">Account</Link></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-3 mb-4">
            <a className="foot text-dark" aria-current="">WELCOME <span>{userData.userName}</span></a>
            <ul className="list-unstyled">
              <li><Link to={'/'} className="text-dark d-block">Home</Link></li>
              <li><Link to={'/category'} className="text-dark d-block">Category</Link></li>
              <li><Link to={'/pro'} className="text-dark d-block">Products</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
