import React from 'react'
import { useState,useEffect } from 'react';

const useFetch = (url) => {
    const [data,setData] = useState([]);
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(true);
    
    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true)
            method:
            try{
                const res =  await fetch(url)
                const json =  await res.json()

                setData(json);
                setLoading(false);
            }catch(error){
                setError(true);
                setLoading(false);
            }
        }
        fetchData();
    },[url]);
  return { data, error, loading }
}

export default useFetch;