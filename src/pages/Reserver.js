import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import '../styles/billeterie.css'
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
        agencyMail
        price
        constantVip
        allerSimple
        }
      }
    }
  }
`

const Reserver = () => {
  const {id} = useParams()
  const {data,error,loading}= useQuery(AGENCY, {variables:{id:id}})
  if (loading) return <p>loaging...</p>
  const agency = data.agency.data.attributes
  return (
    <div className="billetery">
      <h1>{agency.name}</h1>
      <Form
      name="basic"
      layout="vertical"
      autoComplete="on"
     >
      <Form.Item
      label="nom"
    name="reserverName"

      >
        <Input type="text"></Input>
      </Form.Item>
      <Form.Item
      label="numero"
    name="reserverName"

      >
        <Input type="text"></Input>
      </Form.Item>
        <Form.Item
        label="destination"
        name="agency"
        ><Select
        title="desctination">
          <option value="Yaounde-Douala">Yaounde-Douala</option>
          <option value="Douala-Yaounde">Douala-Yaounde</option>
        </Select>
        </Form.Item>
        <Form.Item
        label="data"
        name="date"
        >
        <Input type="date"></Input>
        </Form.Item>
        <Form.Item
        label="Heure"
        name="heure"
        >
        <Input type="time"></Input>
        </Form.Item>
        <Form.Item
        label="VIP"
        name="statut"
        >
      <Input type="checkbox" name="statut" value={true}/>
        
        </Form.Item>

        <Button type="primary"  htmlType="reset">Reset</Button>

        <Button type="primary" htmlType="submit">Submit</Button>      </Form>
    </div>
  )
}

export default Reserver