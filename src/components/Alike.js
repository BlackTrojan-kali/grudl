import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {useQuery,gql } from '@apollo/client';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper';
const ALIKE = gql`
query GetCategory($id:ID!){
  category(id:$id){
    data{
      id
      attributes{
        name
      	products{
          data{
            id
            attributes{
              images{
                data{
                  id
                  attributes{
                    url
                  }
                }
              }
              title
              notation
              price
              description
              categories{
                data{
                  id
                  attributes{
                    name
                  }
                }
              }
            }
          }
        }
      }
      
    }
  }
}
`

export default function Alike({alike}) {
  const {loading, error, data}= useQuery(ALIKE,{variables:{id:alike}})
  if(loading) return <p>Loading ...</p>
  if(!data) return <p>no data found</p>
  if(error) return <p>error fetching data please check the server</p>
  const AlikeItems = data.category.data.attributes.products.data;
  return (
    <>
    <div>
      <h2 style={
        {
          textAlign:"center",
        }
      }>Vous allez aussi aimer</h2>
    </div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
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
        {AlikeItems.map(item=>(
      <SwiperSlide key={item.id}
      >

      <Link to={`/ProductDetails/${item.id}`}>
         <img src={"http://localhost:1337"+item.attributes.images.data[0].attributes.url} alt="" />
         </Link>  
        </SwiperSlide>)
        )
}</Swiper>
    </>
  );
}
