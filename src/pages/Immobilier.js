import '../styles/immobilier.css'
import {AiTwotoneHeart} from 'react-icons/ai'
import { gql,useQuery } from '@apollo/client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { Zoom, Navigation, Pagination } from 'swiper';
import FilterHouse from '../components/FilterHouse';

const HOUSES= gql`
query GetHouses{
    houses{
      data{
        id
        attributes{
          name
          notation
          description
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
const Immobilier = () => {
    const { data, error, loading }= useQuery(HOUSES);
    {console.log(data)}
    if(loading)return <p>fetching data please wait... </p>
    if(error)  return <p className='Home'>error while fetching your data check if the data server is opened</p>
    
  return (
    <div className='immo'>
           <FilterHouse/>
 
    <div className='houses'>
            {
                data.houses.data.map(house=>(
                    <div className="houseBox" key={house.id}>
                 <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        zoom={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Zoom, Navigation, Pagination]}
        className="mySwiper"
      >
        {house.attributes.images.data.map(image=>(
          
        <SwiperSlide key={image.id}>
        <div className="swiper-zoom-container">
          <img src={"http://localhost:1337"+image.attributes.url} />
        </div>
      </SwiperSlide>
  
        ))}
      </Swiper>
                        <div className="houseDesc">
                          <div className="heading">
                           <h2> {house.attributes.name}</h2>
                           <span>{house.attributes.notation} <AiTwotoneHeart/></span>
                           </div>
                           <p>{house.attributes.description}</p>
                           <h4>{house.attributes.price} fcfa</h4>
                           <Link to={`/HouseDetail/${house.id}`}> <button className='seemore'>Voir</button></Link>
                        </div>
                    </div>
                ))
            }
    </div>
    </div>
  )
}

export default Immobilier