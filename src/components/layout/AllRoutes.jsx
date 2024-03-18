import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../Home/Home'
import { ProductDetails } from '../Product/ProductDetails'
import { Products } from '../Product/Products'
import { Search } from '../Product/Search'
import { LoginSignup } from '../User/LoginSignup'
import { Profile } from '../User/Profile'

import  About  from '../pages/About'
import { Contact } from '../pages/Contact'
import { Loader } from './Loader/Loader'
import UpdateProfile from '../User/UpdateProfile'
import UpdatePassword from '../User/UpdatePassword'
import ForgotPassword from '../User/ForgotPassword'
import ResetPassword from '../User/ResetPassword'
import Cart from '../Cart/Cart'
import Shipping from '../Cart/Shipping'
import ConfirmOrder from '../Cart/ConfirmOrder'
import Payment from '../Cart/Payment'
import {useState,useEffect} from 'react';
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from '../Cart/OrderSuccess'
import MyOrders from '../Order/MyOrders'
import OrderDetails from '../Order/OrderDetails'
import Dashboard from '../Admin/Dashboard'
import ProductList from '../Admin/ProductList'
import NewProduct from '../Admin/NewProduct'
import UpdateProduct from '../Admin/UpdateProduct'
import OrderList  from '../Admin/OrderList'
import ProcessOrder from '../Admin/ProcessOrder'
import UsersList from '../Admin/UserList'
import UpdateUser from '../Admin/UpdateUser'
import ProductReviews from '../Admin/ProductReviews'
export const AllRoutes = () => {
  const { isAuthenticated,user } = useSelector(state => state.user);
  
  const [stripeApiKey, setStripeApiKey] = useState("");
  
  async function getStripeKey() {
    const { data } = await axios.get('/api/v1/key/stripeapikey');
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {

    getStripeKey();
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route path="/search" element={<Search />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/sad" element={<Loader />} />
      <Route path="/login" element={<LoginSignup />} />
      <Route path="cart" element={<Cart />} />
      <Route path="/login/shipping" element={isAuthenticated ? <Shipping /> : <LoginSignup />} />
      <Route path="/order/confirm" element={<ConfirmOrder />} />


      <Route path="/account" element={isAuthenticated ? <Profile /> : <LoginSignup />} />
      <Route path="/me/update" element={isAuthenticated ? <UpdateProfile /> : <LoginSignup />} />
      <Route path="/password/update" element={isAuthenticated ? <UpdatePassword /> : <LoginSignup />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="password/reset/:token" element={<ResetPassword />} />

      {stripeApiKey && (
        <Route path="/process/payment" element={isAuthenticated ? <Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements> : <LoginSignup />} />
      )}
      <Route path="/success" element={isAuthenticated ? <OrderSuccess /> : <LoginSignup />} />
      <Route path="/orders" element={isAuthenticated ? <MyOrders /> : <LoginSignup />} />
      <Route path="/orderdetails/:id" element={isAuthenticated ? <OrderDetails /> : <LoginSignup />} />

      <Route path="/admin/dashboard" element={isAuthenticated && user.role==='admin' ? <Dashboard /> : <LoginSignup />} />
      <Route path="/admin/products" element={isAuthenticated && user.role==='admin'? <ProductList /> : <LoginSignup />} />
      <Route path="/admin/product" element={isAuthenticated && user.role==='admin'? <NewProduct /> : <LoginSignup />} />
      <Route path="/admin/product/:id" element={isAuthenticated && user.role==='admin'? <UpdateProduct /> : <LoginSignup />} />
      <Route path="/admin/orders" element={isAuthenticated && user.role==='admin'? <OrderList /> : <LoginSignup />} />
      <Route path="/admin/order/:id" element={isAuthenticated && user.role==='admin'? <ProcessOrder /> : <LoginSignup />} />

      <Route path="/admin/users" element={isAuthenticated && user.role==='admin'? <UsersList /> : <LoginSignup />} />
      <Route path="/admin/user/:id" element={isAuthenticated && user.role==='admin'? <UpdateUser /> : <LoginSignup />} />

      <Route path="/admin/reviews" element={isAuthenticated && user.role==='admin'? <ProductReviews /> : <LoginSignup />} />
       
    </Routes>

  )
}
