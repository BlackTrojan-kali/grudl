import { gql,useQuery } from '@apollo/client'
import '../styles/housedetail.css'
import {AiTwotoneHeart} from 'react-icons/ai'
import { useParams } from 'react-router-dom'
const HOUSE = gql`
query GetHouse($id:ID!){
  house(id:$id){
    data{
      id
      attributes{
        name
        notation
        description
        price
        owner
        ownerMail
        owner_contact
        status
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
const HouseDetail = () => {
  const {id} = useParams();
  const {error,loading,data} = useQuery(HOUSE,{
    variables:{id:id}
  })
  if(loading) return <p>Loading ... </p>
  if(error) return <p>error...</p>
  const home = data.house.data.attributes;  
  return (
    <div className='house-details'>
      <div className="home-illustration">
        <div className="home-single-image">
          <img src={"http://localhost:1337"+home.images.data[0].attributes.url} alt="" />
        </div>
        <div className="home-desc">
          <h1>{home.name}</h1>
          <h3>{home.notation} <AiTwotoneHeart/></h3>
          <p>{home.description}</p>
          <h3>{home.price} fcfa</h3>
          {console.log(home.status)}
          {home.status ? <h3 className='aprouve'>Aprouve</h3>:<h2 className='attente'>En attente</h2>}
          <p>
            <h4>owner</h4>
            <span>{home.owner}</span> <br />
            <span>email: {home.ownerMail}</span> <br />
            <span>contact: {home.owner_contact}</span>
          </p>
        </div>
      </div>
    
      <h2>illustration</h2>
      <div className="catalogue">
        {
            home.images.data.map(image=>(
              <div className="element" key={image.id}>
                <img src={"http://localhost:1337"+image.attributes.url} alt="" />
              </div>
            ))
          }
          </div>
    </div>
  )
}

export default HouseDetail