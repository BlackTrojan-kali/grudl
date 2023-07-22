import React from 'react'
import '../styles/homepage.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination"; 
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
const PRODUCTS = gql`
query GetProducts{
  products{
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
const HomePages = ({cart,addToCart}) => {
  const { data, error, loading }= useQuery(PRODUCTS);
  {console.log(data)}
  if(loading)return <p>fetching data please wait... </p>
  if(error)  return <p className='Home'>error while fetching your data check if the data server is opened</p>
  return (
    <div className='Home'>

<div className="categories">
          <div className="category">
          <RiTShirt2Line/>
          <h4>T-shirts</h4>
          </div>

          <div className="category">
          <GiUnderwearShorts/>
          <h4>shirts</h4>
          </div>

          <div className="category">
          <SiRepublicofgamers/>
          <h4>Jeux</h4>
          </div>

          <div className="category">
          <MdSportsRugby/>
          <h4>sport</h4>
          </div>

          <div className="category">
          <CgSmartphoneChip/>
          <h4>Composant</h4>
          </div>

          <div className="category">
          <GiWhiteBook/>
          <h4>Livre</h4>
          </div>
          
          
          <div className="category">
          <IoLogoElectron/>
          <h4>Electronique</h4>
          </div>

          <div className="category">
          <SiJirasoftware/>
          <h4>Logiciels</h4>
          </div>

</div>
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
        {data.products.data.map(slide=>(
        <SwiperSlide key={slide.id}>
            <img src={"http://localhost:1337"+slide.attributes.images.data[0].attributes.url} alt="" />
        </SwiperSlide>
        ))}
      </Swiper>
      <div className="main">
      <div className="dataList">
      {data.products.data.map(prod=>(
        <div className="dataItem">
          <div className="boxData" key={prod.id}>
            <img src={"http://localhost:1337"+prod.attributes.images.data[0].attributes.url} alt="" />
            <div className="describe">
              <h3>{prod.attributes.title}  <span className='like'>{prod.attributes.notation} <AiTwotoneHeart/></span></h3>
              <p>{prod.attributes.description.slice(0,35)}...</p>
              <h4>{prod.attributes.price} XAF</h4>
             <Link to={`/ProductDetails/${prod.id}`}> <button className='seemore'>Voir</button></Link>
              <button className='addtocart' onClick={()=>addToCart(prod)}>Ajouter au Panier <BsCart4/></button>
            </div>
          </div>
        </div>
      ))}
      </div>
      </div>
      </div>
  )
}

export default HomePages