import React from 'react'
import { Routes ,Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.jsx'
import Cart from '../pages/Cart.jsx'
import Catalog from '../pages/Catalog.jsx'
import Product from '../pages/Product.jsx'



const RoutesCode = () => {
  return (
    <>
        <Route path='/' element={<Home/>} />
        <Route path='/catalog/:slug' element={<Product/>} />
        <Route path='/catalog' element={<Catalog/>} />
        <Route path='/cart' element={<Cart/>} />
    </>
  )
}

export default RoutesCode