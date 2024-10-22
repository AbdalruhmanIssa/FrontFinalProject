import React from 'react'
import styles from './head.module.css'
import './header.css'
import { Link } from 'react-router-dom'
export default function () {
  return (
  
    <div id="carouselExampleAutoplaying" className="carousel  slide vh-100 " data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active img1 vh-100">
   <div className="carousel-caption header-display h-100 d-flex justify-content-center align-items-center ">
  <div className="carousel-box text-light">
    <h1>paradise</h1>
    <p>collections</p>
    <Link to={'/category'}>
    <button type="button" class="btn btn-light btn-lg link">shop now</button>
    
    </Link>
  </div>
</div>

    </div>
    <div className="carousel-item img2 vh-100">
    </div>
    <div className="carousel-item img3 vh-100">
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>

  )
}
