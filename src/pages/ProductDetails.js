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
import Alike from '../components/Alike';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const PRODUCT = gql`
    query GetProduct($id:ID!){
        product(id:$id){
          data{
            id
            attributes{
              notation
              title
              colors{
                data{
                  attributes{
                    color
                  }
                }
              }
              sizes{
                data{
                  id
                  attributes{
                    Size
                  }
                }
              }
              qty
              promotion
              description
              in_stock
              price
              categories{
                data{
                  id
                  attributes{
                    name
                  }
                }
              }
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
const ProductDetails = ({cart,addToCart,qty,Addqty,Lessqty}) => {
  const {id} = useParams()
  const [value, setValue] = React.useState();
const [size,setSize]= useState();
const [color,setColor]= useState()
  const {loading,error,data}= useQuery(PRODUCT,{variables:{id:id}})

  if(loading) return <p> <br /> <br /> <br /> loading....</p>
  if(error) return <p> <br /> <br /> <br />error</p>
    console.log({data})
    const prod = data.product.data.attributes
    const sizes = prod.sizes.data
    const colors = prod.colors.data
    const handleSize =(e)=>{
      setSize(e)
    }
    const handleColor = (e)=>{
      setColor(e)
    }
    const prode = data.product.data
    const alike = data.product.data.attributes.categories.data[0].id  
    console.log(alike)
  return (
    <div className='product-detail'>
      <div className="illustrate">
        <div className="IM">
          <img src={"http://localhost:1337"+prod.images.data[0].attributes.url}  alt="" />
        </div>
        <div className="desc-prod">
          <h2>{prod.title}</h2>
          <Typography component="legend">Appreciations</Typography>
      <Rating name="read-only" value={prod.notation} readOnly />
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
          <div className="sizes">
          <h4>Sizes</h4>
            {sizes.length==0? "no size":
            <div className="sizesList">
              
              {sizes.map(size=>(
                <div className="sizesList" key={size.id}>
                  <><input type="radio" onChange={()=>handleSize(size.attributes.Size)} name='size'/>{size.attributes.Size}</>
                </div>
              ))}
            </div>
              }
          </div>
          <div className="sizes">
          <h4>colors</h4>
            {colors.length==0? "default color":
            <div className="sizesList">
              
              {colors.map(color=>(
                <div className="colorList" key={color.id}>
                  <><input type="radio" onChange={()=>handleColor(color.attributes.color)} name='color'/><span style={{
                    backgroundColor:color.attributes.color,
                    width:100,
                    color:'white',
                    borderRadius:12,
                    padding:5
                  }}>{color.attributes.color}</span></>
                </div>
              ))}
            </div>
              }
          </div>
              
         <button className='addtocart' onClick={()=>addToCart(prode,qty,size,color)}>Ajouter Au Panier <BsCart4/> </button>
        </div>
      </div>
      {console.log(alike)}
      <Alike alike={alike}/>
      
      </div>
  )
}

export default ProductDetails