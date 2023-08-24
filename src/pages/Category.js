import { useParams } from 'react-router-dom'
import '../styles/homepage.css'
import {AiTwotoneHeart} from 'react-icons/ai'
import {BsCart4} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { gql,useQuery } from '@apollo/client'
const CATEGORY = gql`
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
const Category = ({cart,addToCart}) => {
  const {id} = useParams();
  const {loading, error, data}= useQuery(CATEGORY,{variables:{id:id}})
  if(loading) return <p>Loading ...</p>
  if(!data) return <p>no data found</p>
  if(error) return <p>error fetching data please check the server</p>
  
  console.log(data)

  return (
    <div className='Home'>
        <div className="main">
        <div className="groupTitle"><h1 className='Gtitle'>{data.category.data.attributes.name}</h1></div>
     
      <div className="dataList">
      {data.category.data.attributes.products.data.map(prod=>(
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

export default Category