
import '../styles/homepage.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination"; 
import { useState } from 'react';
import {AiTwotoneHeart} from "react-icons/ai";
import {BsCart4} from 'react-icons/bs';
import {RiTShirt2Line}from 'react-icons/ri'
import {GiUnderwearShorts,GiWhiteBook}from 'react-icons/gi'
import {MdSportsRugby} from 'react-icons/md'
import { EffectCoverflow, Pagination } from "swiper";
import { useQuery,gql } from '@apollo/client';
import {IoLogoElectron} from 'react-icons/io5'
import {SiRepublicofgamers} from 'react-icons/si'
import {CgSmartphoneChip} from 'react-icons/cg'
import {SiJirasoftware} from 'react-icons/si'
import TheFilter from '../components/TheFilter';
import Side from '../components/Side';
import { URI } from "../hooks/constant";
const PRODUCTS = gql`
query GetProducts{
  products(sort:"description"){
    data{
      id
      attributes{
        title
        notation
        images{
          data{
            attributes{
              url
            }
          }
        }
        description
        price
        in_stock
        promotion
      }
    }
  }
}
`
const HomePages = ({cart,addToCart,qty}) => {
  const { data, error, loading }= useQuery(PRODUCTS);
  const [more,setMore]= useState(20);
  
  if(loading)return <p>fetching data please wait... </p>
  if(error)  return <p className='Home'>error while fetching your data check if the data server is opened</p>
  
  const handleMore =()=>{
    if(more>=data.products.data.length){
      setMore(data.products.data.length)
    }else{
      setMore(more+20);
    }  
  }
  return (
    <div className='Home'>


     {console.log(data)}
      <h2>Bienvenu sur <span> Grudl</span></h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {data.products.data.slice(0, 7).map(slide=>(
        <SwiperSlide key={slide.id}>

      <Link to={`/ProductDetails/${slide.id}`}>
            <img src={`${URI}`+slide.attributes.images.data[0].attributes.url} alt="" />
      </Link>
        </SwiperSlide>
        ))}
      </Swiper>
      <div className="main">
        <div className="banner">
          <img src="grudl.jpg" alt=""  />
        </div>

      <div className="groupTitle"><h1 className='Gtitle'>Tous les produits</h1></div>
      <div className="dataList">
      {data.products.data.slice(0,more).map(prod=>(
        <div className="dataItem">
          <div className="boxData" key={prod.id}>
            <img src={`${URI}`+prod.attributes.images.data[0].attributes.url} alt="" />
            <div className="describe">
              <h3>{prod.attributes.title}  <span className='like'>{prod.attributes.notation} <AiTwotoneHeart/></span></h3>
              <p>{prod.attributes.description.slice(0,35)}...</p>
              <h4>{prod.attributes.price} XAF</h4>
             <Link to={`/ProductDetails/${prod.id}`}> <button className='seemore'>Voir</button></Link>
              <button className='addtocart' onClick={()=>addToCart(prod,qty)}>Ajouter au Panier <BsCart4/></button>
            </div>
          </div>
        </div>
      ))}
      </div>
      { data.products.data.length>=more?
      <button className='loadMore' onClick={()=>handleMore()}>Load more...</button>:""
}

<div className="banner">
          <img src="grudlflyer.jpg" alt=""  />
        </div>
      </div>
      </div>
  )
}

export default HomePages