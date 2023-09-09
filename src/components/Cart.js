import {BsFillTrashFill} from 'react-icons/bs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Payer from './Payer';
import { message } from 'antd';
import { useAuthContext } from '../context/authContex';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 14,
    pb: 2,
  };
  
const Cart = ({cart,cartOn,removeFromCart,Addqty,Lessqty,setCart}) => {
    const [open, setOpen] = useState(false);
    const {user} = useAuthContext();
    const navigate = useNavigate();
    console.log(user);
    const handleOpen = () => {
        if(cart.length<=0){
            message.error('votre panier est vide')
            setOpen(false)
        }else if(!user){
          message.error('you are not logged in');
          navigate('/Signin',{replace:true})
        }
        else{
      setOpen(true);
        }
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <>
        <div className={cartOn ? "cart":"cartoff"}>
        <div className="cart-header">
        {cart.length >0 ? <h2>Vous avez {cart.length } element(s) dans votre panier</h2>:
        <h2>Votre panier est vide</h2>
        }
            <div className="cart-elem">
               <>
                {
                 
                cart.map(prod=>(
                (
                        <>
                            <div className="cart-element">
                                <img className='cart-images' src={"http://localhost:1337" + prod.prod.attributes.images.data[0].attributes.url} alt="" />
                                <div className="cart-elem-desc">
                                    <h4>{prod.prod.attributes.title}</h4>
                                  {prod.size?  <h4>size : {prod.size}</h4>:""}
                                  {prod.color?  <h4>couleur : {prod.couleur}</h4>:""}
                                    <div className="cartQty">
                                        <button className='minus' onClick={() => Lessqty(prod)}>-</button>
                                        {prod.qty && prod.qty}
                                        <button className='minus' onClick={() => Addqty(prod)}>+</button>
                                    </div>
                                    <h4>{prod.prod.attributes.price * prod.qty} Fcfa</h4>
                                    
                                </div>
                                <BsFillTrashFill className='cartRemove' onClick={()=>removeFromCart(prod.prod)}/>
                            </div>
                        </>
                    )
                ))
                }

<div className="total">
                                <h2>Total :{cart.reduce((total,item)=>total +(item.prod.attributes.price*item.qty),0)} Fcfa</h2>
                       
                            <button onClick={handleOpen} className='purchase'>Acheter</button>
                            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
        <Payer cart={cart} handleClose={handleClose} setCart={setCart}></Payer>
        </Box>
      </Modal>
         </div></>
            </div>
        </div>
    </div>
    </>  
  )
}

export default Cart