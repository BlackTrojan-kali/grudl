import React from 'react'
import {FaFacebookF,FaInstagram,FaYoutube,FaTwitter} from 'react-icons/fa';
import '../styles/footer.css'
export default function Footer() {
  return (
    <footer>
    <div className='footer'>
      <div className="patenaires">
        <ul>
          <li>3hcigcoopca</li>
          <li>minpmeesa</li>
        </ul>
      </div>
      <div className="logo">
        <h1 className="Logo">
         <img style={{width:100}} src="logo grudl.png" alt="" />
        </h1>
        <div className="socials">
        <FaFacebookF/> 
        <FaInstagram/> 
        <FaYoutube/> 
        <FaTwitter/> 
        </div>
      </div>
      <div className="useful-links">
<ul>
  <li>650105100</li>
</ul>
      </div>
    </div>
    <div className="copy">

    <p>&copy; All right Reserved || 2023 - 2024 designed by Blacktrojan</p>
    </div>
    </footer>
  )
}
