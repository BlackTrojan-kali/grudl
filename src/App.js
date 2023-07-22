import logo from './logo.svg';
import './App.css';
import { Routes,BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Category from './pages/Category'
import HomePages from './pages/HomePages'
import ProductDetails from './pages/ProductDetails'
import { useState } from 'react';
import { RiH1 } from 'react-icons/ri';
import Cart from './components/Cart';
import { ApolloClient,InMemoryCache,ApolloProvider } from '@apollo/client';
import Immobilier from './pages/Immobilier';
import HouseDetail from './pages/HouseDetail';
import HouseFiltered from './pages/HouseFiltered';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})
function App() {
  const [cart,setCart]= useState([]);
  const [cartOn,setCartOn]= useState(false);
  const removeFromCart=(item)=>{
    setCart(cart.filter(items=> items.id !== item.id))
}

  const handleShow = () =>{
    setCartOn(!cartOn);
  }
  const addToCart= (data)=>{
    if(cart.includes(data)){
      alert('le panier contient deja cet element');
    }else if(data.attributes.in_stock == false){
      alert('le stock est epuise');
    }else{

    setCart(cart=>[...cart,data])
    }
  }
  
 
  return (

    <ApolloProvider client={client}>
  <BrowserRouter >
    <div className="App">
        <Header cart={cart} handleShow={handleShow}/>
        <Cart cart={cart} cartOn={cartOn} removeFromCart={removeFromCart} />
        <Routes>
          <Route exact path='/' element={<HomePages cart={cart} addToCart={addToCart}/>}/>
          <Route path='/ProductDetails/:id' element={<ProductDetails cart={cart} addToCart={addToCart}/>}/>
          <Route path='/Category/:id' element={<Category cart={cart} addToCart={addToCart}/>}/>
          <Route path='/HouseDetail/:id' element={<HouseDetail cart={cart} />}/>
          <Route path='/Immobilier' element={<Immobilier cart={cart} />}/>
          <Route path='/HouseFiltered/:id' element={<HouseFiltered cart={cart} addToCart={addToCart}/>}/>
        </Routes>
        <Footer></Footer>
    </div>
    </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
