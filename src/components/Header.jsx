import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation , NavLink , Navigate, useNavigate } from 'react-router-dom'

import { refreshCart } from '../redux/shopping-cart/cartItemSlice';

import logo from '../assets/images/Logo-2.png';
import product_12_image_01 from '../assets/images/products/product-12(1).jpg'

const mainNav = [
  {
    display: "Trang chủ",
    path: "/"
  },
  {
    display: "Sản phẩm",
    path: "/catalog"
  },
  {
    display: "Phụ kiện",
    path: "/"
  },
  {
    display: "Liên hệ",
    path: "/"
  }
]

const Header = () => {

  //useLocation ********
  const{pathname} = useLocation();
  const navigate = useNavigate();
  const activeNav = mainNav.findIndex(e=>e.path===pathname);
  const [haveLogin,setHaveLogin] = useState(true)
  const headerRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll",()=>{
      if(document.documentElement.scrollTop >80 || document.body.scrollTop >80){
        headerRef.current.classList.add('shrink')
      }else{
        headerRef.current.classList.remove('shrink')
      }
    })
  
    return () => {
      window.removeEventListener("scroll",()=>{})
    }
  }, [])

  const menuLeft = useRef(null);
  const menuLeftToggle = () => menuLeft.current.classList.toggle('active');
  const handleLogout = () => {
    localStorage.setItem('login',null);
    window.location.reload();
  }
  // const checkLogin = () => {
  //   setHaveLogin(JSON.parse(localStorage.getItem('login')) !== null ? false : true)
  //   console.log(haveLogin)
  // }
  const checkLogin = JSON.parse(localStorage.getItem('login'))
  useEffect(()=>{
    setHaveLogin(JSON.parse(localStorage.getItem('login')) !== null ? false : true)
    console.log('chạy')
  },[checkLogin])
 
  return (
    <div className='header' ref={headerRef}>
      <div className="container">
        
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className="header__menu">
            <div className="header__menu__mobile-toggle" onClick={()=>menuLeftToggle()}>
              <i className="bx bx-menu-alt-left"></i>
            </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={()=>menuLeftToggle()}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {
              mainNav.map((item,index)=>(
                <div 
                className={`header__menu__item header__menu__left-item ${index===activeNav ? 'active' :''}`} 
                key={index}
                onClick={menuLeftToggle}
                >
                  <Link to={item.path}>
                    <span>{item.display}</span>
                  </Link>
                </div>
              ))
            }
          </div>
          
          <div className="header__menu__right">
            <div className="header__menu__right-item header__menu__item">
              <i className="bx bx-search"></i>
            </div>
            <div className="header__menu__right-item header__menu__item">
              <Link to={"/cart"}>
                <i className="bx bx-cart"></i>
              </Link>
            </div>
            <div className="header__menu__right-item header__menu__item">
              <Link 
                // onClick={checkLogin}
                to={`/${window.location.href.split('/').pop()}`}
                state={haveLogin}
                className="header__menu__item__link"
              >
                {JSON.parse(localStorage.getItem('login'))?<div className="header__menu__item__user">
                  <img src={product_12_image_01} alt="" className='header__menu__item__user-image'/>
                  <span className='header__menu__item__user-username'>{JSON.parse(localStorage.getItem('login'))}</span>
                </div>:  <i className="bx bx-user"></i> }       
              </Link>
              {JSON.parse(localStorage.getItem('login'))?
                <div className="header__menu__item__user__control">
                    <div className="header__menu__item__user__control-item">
                      Đổi mật khẩu
                    </div>
                    <div className="header__menu__item__user__control-item">
                    <Link 
                      to={`/${window.location.href.split('/').pop()}`}
                      onClick={handleLogout}
                      >
                        Đăng xuất
                    </Link>
                    </div>
                </div>:''
              }
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Header