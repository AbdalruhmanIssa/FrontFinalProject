import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductsDisplay({image,name,price,id}) {
  return (
    <div className="col-md-4 d-flex justify-content-center align-items-center text-center">
    <div className="card border-0 w-50">
<Link  to={id}><img src={image} className="card-img-top" alt={name}  /></Link>

      
      <div className="card-body">
        <h5 className="card-title ">{name.substring(0,20)}...</h5>
        <p className="card-text">{price}$</p>
<Link className='btn btn-primary' to={id}>Details</Link>
      </div>
    </div>
</div>
  )
}
