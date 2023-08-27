import { Link } from 'react-router-dom';
import '../styles/billeterie.css'
import { gql,useQuery } from '@apollo/client'

const AGENCIES = gql`
query getAgency{
    agencies{
      data{
        id
        attributes{
          name
          image{
            data{
              id
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
const Billeterie = () => {
    const {data,loading,error} = useQuery(AGENCIES);
    if(loading) return <p>loading...</p>
    if(error) return <p>error...</p>
   const agencies= data.agencies.data
    return (
    <div className='billeterie'>
        {agencies.map(agency=>(
            <Link to={`/Reserver/${agency.id}`}>
            <div className="agency">
                  <img src= {"http://localhost:1337"+agency.attributes.image.data[0].attributes.url} alt="" />
                  <h1>{agency.attributes.name}</h1> 
            </div>
            </Link>
        ))}
    </div>
  )
}

export default Billeterie