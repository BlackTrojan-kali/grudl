import logo from './logo.svg';
import './App.css';
import { Routes,BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Category from './pages/Category'
import HomePages from './pages/HomePages'
import ProductDetails from './pages/ProductDetails'
import { useEffect, useState } from 'react';
import { RiH1 } from 'react-icons/ri';
import Cart from './components/Cart';
import { ApolloClient,InMemoryCache,ApolloProvider } from '@apollo/client';
import Immobilier from './pages/Immobilier';
import HouseDetail from './pages/HouseDetail';
import HouseFiltered from './pages/HouseFiltered';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import Profile from './components/profile';
import {message} from "antd"
import Billeterie from './pages/Billeterie';
import Reserver from './pages/Reserver';
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})
function App() {
  let [cart,setCart] = useState([]);
  let qty= 1;
  let couleur='defaut';
  const Addqty=(elem)=>{
   
    let finder = cart.findIndex((obj=>obj.prod.attributes.title ==elem.prod.attributes.title)) 
    const newstate = cart.map(obj =>{
      console.log(obj)
      if (obj.prod.attributes.title == elem.prod.attributes.title){
          if(obj.qty>=20){
            return {...obj,qty:20}
          }
        return{...obj,qty:elem.qty+1}
      }

      return obj;
    })
    setCart(newstate)
  }
  const Lessqty=(elem)=>{
    let finder = cart.findIndex((obj=>obj.prod.attributes.title ==elem.prod.attributes.title)) 
    const newstate = cart.map(obj =>{
      console.log(obj)
      if (obj.prod.attributes.title == elem.prod.attributes.title){
          if(obj.qty <=0)
            return {...obj,qty:0}
    
        return{...obj,qty:elem.qty-1}
      }

      return obj;
    })

    setCart(newstate)
  }
  console.log(qty)

  const [cartOn,setCartOn]= useState(false);
  const removeFromCart=(item)=>{
    setCart(cart.filter(items=> items.prod.id !== item.id))
}

  const handleShow = () =>{
    setCartOn(!cartOn);
  }
  const addToCart= (prod,qty,size,color)=>{
    if(cart.filter(value =>prod == value.prod).length>0){
      message.error('le panier contient deja cet element');
    }else if(prod.attributes.in_stock == false){
      message.error('le stock est epuise');
    }else{

    setCart(cart=>[...cart,{prod,qty,size,color}])
    message.success('element ajoute avec success')
    }
  }
  
  console.log(cart)
 
  return (

    <ApolloProvider client={client}>
  <BrowserRouter >
    <div className="App">
        <Header cart={cart} handleShow={handleShow}/>
        <Cart cart={cart} cartOn={cartOn} Addqty={Addqty} Lessqty={Lessqty}  removeFromCart={removeFromCart} />
        <Routes>
          <Route exact path='/' element={<HomePages cart={cart} qty={qty} addToCart={addToCart}/>}/>
          <Route path='/ProductDetails/:id' element={<ProductDetails qty={qty} Addqty={Addqty} Lessqty={Lessqty} cart={cart} addToCart={addToCart}/>}/>
          <Route path='/Category/:id' element={<Category cart={cart} addToCart={addToCart}/>}/>
          <Route path='/HouseDetail/:id' element={<HouseDetail cart={cart} />}/>
          <Route path='/Immobilier' element={<Immobilier cart={cart} />}/>
          <Route path='/HouseFiltered/:id' element={<HouseFiltered cart={cart} addToCart={addToCart}/>}/>
          <Route path='/Signup' element={<Signup cart={cart} />}/>
          <Route path='/SignIn' element={<SignIn cart={cart} />}/>
          <Route path='/Profile' element={<Profile cart={cart} />}/>
          <Route path='/Billeterie' element={<Billeterie cart={cart} />}/>
          <Route path='/Reserver/:id' element={<Reserver cart={cart} />}/>
        </Routes>
        <Footer></Footer>
    </div>
    </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
