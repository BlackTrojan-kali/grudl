import {BsFillTrashFill} from 'react-icons/bs';
const Cart = ({cart,cartOn,removeFromCart}) => {
  
    return (
        <>
        <div className={cartOn ? "cart":"cartoff"}>
        <div className="cart-header">
        {cart.length >0 ? <h1>vous avez {cart.length} element(s) dans votre panier</h1>:
        <h1>votre panier est vide</h1>
        }
            <div className="cart-elem">
                {
                    cart.map(item=>(
                        <div className="row" key={item.id}>
                            <img src={"http://localhost:1337"+item.attributes.images.data[0].attributes.url} alt="" srcset="" />
                           <div className="desc">
                            <h4>{item.attributes.title}</h4>
                            <h3>{item.attributes.price} xaf</h3>
                            <div className="remove">
                            <BsFillTrashFill onClick={()=>removeFromCart(item)}/>
                            </div>
                            </div>
                           
                        </div>
                    ))
                }

            </div>
        </div>
    </div>
    </>  
  )
}

export default Cart