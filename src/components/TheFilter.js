import { gql,useQuery } from '@apollo/client';
import React, { useState } from 'react'
import {FiFilter} from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/authContex';
import { MenuItem } from 'react-pro-sidebar';

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
    <div>
    {
        
        <div>
        {
            cats.map(cat=>(
                 <MenuItem> <Link key={cat.id} to={`Category/${cat.id}`}>
                        {cat.attributes.name}
                    </Link>  
                    </MenuItem>
            ))
        }
        </div>
  } </div>
  )
}

export default TheFilter