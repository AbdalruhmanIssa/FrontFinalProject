import React from 'react'

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
    <div className="carousel-caption header-display h-100 d-flex justify-content-center align-items-center ">
  <div className="carousel-box text-light">
    <h1>Out Of 
      Office</h1>
    <p>collections</p>
    <Link to={'/category'}>
    <button type="button" class="btn btn-light btn-lg link">shop now</button>
    
    </Link>
  </div>
</div>
    </div>
    <div className="carousel-item img3 vh-100">
    <div className="carousel-caption header-display h-100 d-flex justify-content-center align-items-center ">
  <div className="carousel-box text-light">
    <h1>Sale</h1>
    <p>End of The Season Sale</p>
    <Link to={'/categories'}>
    <button type="button" class="btn btn-light btn-lg link">shop now</button>
    
    </Link>
  </div>
</div>
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
