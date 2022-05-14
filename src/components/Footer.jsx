import React from 'react'
import { Link } from 'react-router-dom'
import Grid from './Grid.jsx'
import logo from '../assets/images/Logo-2.png'

const footerAboutLinks = [
  {
    display: "Giới thiệu",
    path : "/about"
  },
  {
    display: "Liên hệ",
    path : "/about"
  },
  {
    display: "Tuyển dụng",
    path : "/about"
  },
  {
    display: "Tin tức",
    path : "/about"
  },
  {
    display: "Hệ thống cửa hàng",
    path : "/about"
  }
]

const footerCustomerLinks = [
  {
    display: "Chính sách đổi trả",
    path : "/about"
  },
  {
    display: "Chính sách bảo hành",
    path : "/about"
  },
  {
    display: "Chính sách hoàn tiền",
    path : "/about"
  }
]
const Footer = () => {
  return (
    <footer className='footer'>
      <div className="container">
        <Grid
          col={4}
          mdcol={2}
          smcol={1}
          gap={10}
        >
          <div>
            <div className="footer__title">
              Tổng đài hỗ trợ khách hàng
            </div>
            <div className="footer__content">
              <p>
                Liên hệ đặt hàng <strong>094.294.5378</strong>
              </p>
              <p>
                Thắc mắc sản phẩm <strong>094.2113.113</strong>
              </p>
              <p>
                Góp ý , khiếu nại <strong>094.2114.114</strong>
              </p>
            </div>
          </div>

          <div>
            <div className="footer__title">
              Về cửa hàng
            </div>
            <div className="footer__content">
              {
                footerAboutLinks.map((item,index)=>(
                  <p key={index}>
                    <Link to={item.path}>
                      {item.display}
                    </Link>
                  </p>
                ))
              }
            </div>
          </div>

          <div>
            <div className="footer__title">
              CSKH
            </div>
            <div className="footer__content">
              {
                footerCustomerLinks.map((item,index)=>(
                  <p key={index}>
                    <Link to={item.path}>
                      {item.display}
                    </Link>
                  </p>
                ))
              }
            </div>
          </div>
          
          <div className="footer__about">
            <p>
              <Link to={"./"}>
                <img src={logo} alt="" className='footer__logo' />
              </Link>
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod iusto atque inventore. Ducimus quibusdam cumque obcaecati a odio quam corporis maxime! Alias, architecto nisi! Obcaecati eligendi omnis quo a exercitationem.
            </p>
          </div>
        </Grid>
      </div>
    </footer>
  )
}

export default Footer