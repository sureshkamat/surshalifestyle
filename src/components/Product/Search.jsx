import React, { useState } from 'react'
import "./Search.css"
import { MetaData } from '../layout/MetaData';
import { useNavigate } from 'react-router-dom';
export const Search = () => {
    const navigate = useNavigate();
    const [keyword,setKeyword]=useState();
    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }else{
            navigate(`/products`);
        }
    }
  return (
    <>
    <MetaData title={`Search a Product -- Sursha Lifestyle` }/>
    <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
        type="text"
        placeholder='Search a product'
        onChange={(e)=>setKeyword(e.target.value)}
        />
        <input 
        type='submit'
        value="Search"
        />
    </form>
    </>
  )
}
