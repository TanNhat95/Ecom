import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Home from '../pages/Home.jsx'
import Product from '../pages/Product.jsx'
import Catalog from '../pages/Catalog.jsx'
import Cart from '../pages//Cart.jsx'
import Test from './Test.jsx'
import User from './User.jsx'
const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />}>
          <Route path='/' element={<Home/>} />
          <Route path='/catalog/:slug' element={<Product/>} />
          <Route path='/catalog' element={<Catalog/>} />
          <Route path='/cart' element={<Cart/>} />
          {/* <Route path='/user' element={<User/>}/> */}
          <Route path='/contact' />
        </Route>
      </Routes> 
    </BrowserRouter>
  )
}

export default Layout