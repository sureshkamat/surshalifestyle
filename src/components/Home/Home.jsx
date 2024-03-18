import React, { useEffect } from 'react';

import { FaMouse } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getProducts } from '../../action/productAction';
import { Loader } from '../layout/Loader/Loader';
import { ProductCard } from './ProductCard';
import './home.css';
import {useAlert} from 'react-alert';
import { MetaData } from '../layout/MetaData';
export const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(state => state.products);
  const alert=useAlert();

  useEffect(() => {
   if(error){
     alert.error(error);
     dispatch(clearError());
   }
     dispatch(getProducts());
  }, [dispatch,error,alert]);
 
 
  return (
    <>
    {loading?<Loader />:
    <>
    <MetaData title="Sursha Lifestyle" />
    <div className="banner">
      <p>Welcome to Sursha Lifestyle</p>
      <h1>Find Amazing Products Below</h1>
      <a href='#container'>
        <button>
          Scroll <FaMouse />
        </button>
      </a>
    </div>
    <h2 className='homeHeading'>Featured Products</h2>
    <div className='container' id='container'>
      {products && products.map((product) => (
        <ProductCard product={product} />
      ))}

    </div>
  </>
  }
    </>
  )
}
