import { gql,useQuery } from '@apollo/client';
import React, { useState } from 'react'
import {FiFilter} from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/authContex';

const CATEGORIES = gql`
query GetCategories{
    categories{
      data{
        id
        attributes{
          name
        }
      }
    }
  }
`

const TheFilter = () => {
    const [filter,setFilter] = useState(false);
    const user = useAuthContext()
  const viewFilter = ()=>{
    setFilter(!filter);
  }
    const {loading,error,data}= useQuery(CATEGORIES);
    if(loading) return <p>Loading ...</p>
    if(error) return <p>error fetching data</p>
  
    const cats = data.categories.data
  
  return (
    <div className='categories'>
 <FiFilter onClick={viewFilter}/>
    {filter ?
    <div className='filters'>
      <nav className='category'> 
        <h3>filtrer les produits</h3>
        <ul>
        {
            cats.map(cat=>(
                  <Link key={cat.id} to={`Category/${cat.id}`}> <li>
                        {cat.attributes.name}
                    </li></Link>  
                
            ))
        }
        </ul>
      </nav>
    </div>:
    <p>filter products</p>  
  }
  {user.user?
  <button className='addHome addComment'>espace commantaire</button>
   :""} </div>
  )
}

export default TheFilter