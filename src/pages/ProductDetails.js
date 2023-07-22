import React from 'react'
import { useParams } from 'react-router-dom'
import '../styles/productdetails.css'
import useFetch from '../hooks/useFetch';
import {AiTwotoneHeart} from 'react-icons/ai'
import {BsCart4} from 'react-icons/bs';
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import { Pagination, Navigation } from "swiper";
import { useQuery,gql } from '@apollo/client';
import { EffectCards } from "swiper";

const PRODUCT = gql`
    query GetProduct($id:ID!){
        product(id:$id){
          data{
            id
            attributes{
              notation
              title
              promotion
              description
              in_stock
              price
              images{
                data{
                  attributes{
                    url
                  }
                }
              }
            }
          }
        }
    }
`
const ProductDetails = ({cart,addToCart}) => {
  const {id} = useParams()
  const {loading,error,data}= useQuery(PRODUCT,{variables:{id:id}})
  if(loading) return <p> <br /> <br /> <br /> loading....</p>
  if(error) return <p> <br /> <br /> <br />error</p>
    console.log({data})
    const prod = data.product.data.attributes
   
    const prode = data.product.data
  return (
    <div className='product-detail'>
      <div className="illustrate">
        <div className="IM">
          <img src={"http://localhost:1337"+prod.images.data[0].attributes.url}  alt="" />
        </div>
        <div className="desc-prod">
          <h2>{prod.title}</h2>
         <h3>{prod.notation} <AiTwotoneHeart/></h3>
          <p>{prod.description}</p>
          {prod.in_stock? 
          <span className='instock'>
            en Stock
          </span>:
          <span className='outofstock'> stock epuise</span>  
        }
          <h3>{prod.promotion?
          <div>
            <span className='oldprice'>{prod.price} fcfa</span>
            <span className='newprice'>{prod.price-(prod.price * prod.promotion/100)} fcfa</span>
          </div>:
          <span className='newprice'>{prod.price} fcfa</span>
                    }</h3>
              
         <button className='addtocart' onClick={()=>addToCart(prode)}>Ajouter Au Panier <BsCart4/> </button>
        </div>
      </div>
      </div>
  )
}

export default ProductDetails