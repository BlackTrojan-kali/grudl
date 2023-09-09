import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { useState } from "react";
import '../styles/billeterie.css'
import '../styles/billet.css'
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  Select,
  message,
  Row,
  Spin,
  Typography,
} from 'antd';

const AGENCY = gql`
query getAgency($id:ID!){
  agency(id:$id){
    data{
      id
      attributes{
        name
        AgencyMail
        reservations{
          data{
            id
          attributes{
            Destination
            price
            VIP
            depart
          }
          }
        }
        }
      }
    }
  }
`

const Reserver = () => {
  const {id} = useParams();
  const { data, error, loading }= useQuery(AGENCY,{variables:{id:id}});
  if(loading)return <p>fetching data please wait... </p>
  if(error)  return <p className='Home'>error while fetching your data check if the data server is opened</p>
  const tickets = data.agency.data.attributes.reservations.data;

  return (
    <div className="billets">
        {tickets.map(ticket=>(
         <Link to={`/Buy/${ticket.id}`}>
         <div className="ticketBox" key={ticket.id}>
            <img src="" alt="" />
            <div className="ticketDesc">
              <h1>{ticket.attributes.Destination}</h1>
              <h3>{ticket.attributes.price} XAF</h3>
              <h3>{ticket.attributes.depart}</h3>
              <h3>{ticket.attributes.VIP? "VIP":"Standard"}</h3>
            </div>
          </div>
        </Link>
        ))}
    </div>
  )
}

export default Reserver