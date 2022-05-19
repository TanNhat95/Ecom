import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom'
import ProductViewModal from './ProductViewModal.jsx'
import User from './User.jsx'

const Test = () => {
  return (
        <div>
              <Header/>
              <div className="container">
                <div className="main">
                    <Outlet/>
                    
                </div>
              </div>
              <Footer />
              <User/>
              <ProductViewModal/>
        </div>  
  )
}

export default Test