import React, { useState } from 'react'
import { Button, Space } from "antd";
import { Link } from 'react-router-dom'
import {FaOpencart,FaBars} from 'react-icons/fa'
import {RiCloseFill} from 'react-icons/ri';
import '../styles/header.css'
import { CgWebsite } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/authContex';
import { removeToken } from '../hooks/helper';

export default function Header({cart,handleShow}) {
  const [close,setClose] = useState(true);
  const handleClose = ()=>{
    setClose(!close);
  }

  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    navigate("/signin", { replace: true });
  };

  return (
    <div className="header">
      <h1 className='Logo'>Grudl !</h1>
      <nav className={close? "navbar":"navbar-responsive"}>
          <Link to='/'>Boutiques</Link>
          <Link to='/Immobilier'>Immobilier</Link>
          <Link>Billeterie</Link>

      </nav>
      <div className="icons">
        
      <Space className="auth_buttons">
            {user ? (
              <>
                <Button className="auth_button_login" href="/profile" type="link">
                  {user.username}
                </Button>
                <Button
                  className="auth_button_signUp"
                  type="primary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button className="auth_button_login" href="/SignIn" type="link">
                  Login
                </Button>
                <Button
                  className="auth_button_signUp"
                  href="/Signup"
                  type="primary"
                >
                  SignUp
                </Button>
              </>
            )}
          </Space>

        <div className="close" onClick={handleClose}>
         {close? <FaBars/>:<RiCloseFill/>}
        </div>
        <FaOpencart onClick={handleShow}/>
        <span className='indice'>{cart.length}</span>
      </div>
    </div>
  )
}
