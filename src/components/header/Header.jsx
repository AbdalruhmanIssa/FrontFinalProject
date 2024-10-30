import React from 'react'

export default function Header({title,sec}) {
  return (

   <header className='d-flex flex-column mt-5 pt-5 justify-content-evenly  mb-5 align-items-center text-center ground '>
    
    <div >
    <h1 className='pb-3'>{title}</h1>
    <p className='text-secondary'>{sec}</p>
  
  </div>


   </header>
  )
}
