import React from 'react'

export default function Header({title}) {
  return (

   <header className='d-flex flex-column mt-5 pt-5 justify-content-evenly  mb-5 align-items-center text-center ground '>
    
    <div >
    <h1 className='pb-3'>{title}</h1>
    <p className='text-secondary'>Shop through our latest selection of Fashion</p>
  
  </div>


   </header>
  )
}
