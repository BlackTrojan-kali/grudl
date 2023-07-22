import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FaOpencart,FaBars} from 'react-icons/fa'
import {RiCloseFill} from 'react-icons/ri';
import '../styles/header.css'
export default function Header({cart,handleShow}) {
  const [close,setClose] = useState(true);
  const handleClose = ()=>{
    setClose(!close);
  }
  return (
    <div className="header">
      <h1 className='Logo'>Grudl !</h1>
      <nav className={close? "navbar":"navbar-responsive"}>
          <Link to='/'>Boutiques</Link>
          <Link to='/Immobilier'>Immobilier</Link>
          <Link>Billeterie</Link>
      </nav>
      <div className="icons">
        <div className="close" onClick={handleClose}>
         {close? <FaBars/>:<RiCloseFill/>}
        </div>
        <FaOpencart onClick={handleShow}/>
        <span className='indice'>{cart.length}</span>
      </div>
    </div>
  )
}
