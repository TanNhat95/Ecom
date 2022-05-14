import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom'
import ProductViewModal from './ProductViewModal.jsx'

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
              <ProductViewModal/>
        </div>  
  )
}

export default Test