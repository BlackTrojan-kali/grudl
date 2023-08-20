import { gql,useQuery } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {FiFilter} from 'react-icons/fi'
const HOUSE_CATEGORIES= gql`


query GetHouseCategories{
    houseCategories{
      data{
        id
        attributes{
           name
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
      }
    }
}
`
const FilterHouse = () => {
    const [filter,setFilter] = useState(false);
    
    const viewFilter = ()=>{
      setFilter(!filter);
    }
    const {loading, error, data} = useQuery(HOUSE_CATEGORIES);
    if(loading) return <p>Loading ...</p>
    if(error) return <p>Error fetching data</p>

    const Fhouses= data.houseCategories.data
    return (
        <div className='categories'>
        <FiFilter onClick={viewFilter}/>
           {filter ?
           <div className='filters'>
             <nav className='category'> 
               <h3>filtrer les produits</h3>
               <ul>
               {
                   Fhouses.map(cat=>(
                         <Link key={cat.id} to={`/HouseFiltered/${cat.id}`}> <li>
                               {cat.attributes.name}
                           </li></Link>  
                       
                   ))
               }
               </ul>
             </nav>
           </div>:
           <p>filter products</p>  
         }
           </div>
  )
}

export default FilterHouse