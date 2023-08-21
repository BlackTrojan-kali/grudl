import {BsFillTrashFill} from 'react-icons/bs';
const Cart = ({cart,cartOn,removeFromCart,Addqty,Lessqty}) => {
  
    return (
        <>
        <div className={cartOn ? "cart":"cartoff"}>
        <div className="cart-header">
        {cart.length >0 ? <h1>vous avez {cart.length } element(s) dans votre panier</h1>:
        <h1>votre panier est vide</h1>
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
                                <h1>Total :{cart.reduce((total,item)=>total +(item.prod.attributes.price*item.qty),0)} Fcfa</h1>
                            <button className='purchase'>Acheter</button>
                            </div></>
            </div>
        </div>
    </div>
    </>  
  )
}

export default Cart