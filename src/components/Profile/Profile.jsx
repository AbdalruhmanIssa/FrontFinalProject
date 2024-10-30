import Header from "../header/Header";
import Useful from "../order/Useful";
import Address from "./Address";
import Info from "./Info";
import './pro.css'

export default function Profile() {

  return (
    <div>
      <Header title="profile" />
      <div className="container">
     <ul className="nav nav-pills mb-5 justify-content-center proFont" id="pills-tab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active " id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Orders</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link  " id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Address</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Acoount Info</button>
  </li>
 
</ul>
<div className="tab-content " id="pills-tabContent">
  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
  <Useful  />

  </div>
  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
    <Address />
  </div>
  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
    <Info />
  </div>
  <div className="tab-pane fade" id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab" tabIndex={0}>...</div>
</div>

      </div>

    </div>
  )
}
/*
      <a className="nav-link active"  aria-current="">Welcome <span className="">{userData.userName}</span></a>
*/