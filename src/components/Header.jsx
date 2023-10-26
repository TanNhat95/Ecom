import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import product_12_image_01 from '../assets/images/products/product-12(1).jpg'
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../redux/slices/usersApiSlice';
import { toast } from 'react-toastify';
import { logoutSlice } from '../redux/slices/authSlice';

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
  const [haveLogin, setHaveLogin] = useState(true)
  const [totalProducts, setTotalProducts] = useState(0)
  //useLocation ********
  const{pathname} = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const activeNav = mainNav.findIndex(e=>e.path===pathname);
  const headerRef = useRef(null);
  const [logout] = useLogoutMutation()

  const { userInfo } = useSelector((state) => state.auth)
  const cartItems = useSelector((state) => state.cartItems.value)

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

  useEffect(() => {
    if(cartItems){
      setTotalProducts(cartItems.reduce((total,item)=>total + Number(item.quantity),0));
    }
  }, [cartItems])
  
  const isLogin = JSON.parse(localStorage.getItem('userInfo'))
  useEffect(() => {
    isLogin ? setHaveLogin(false) : setHaveLogin(true)
  }, [isLogin])

  const menuLeft = useRef(null);
  const menuLeftToggle = () => menuLeft.current.classList.toggle('active');
  const handleLogout = async () => {
    await logout()
    dispatch(logoutSlice())
    setTotalProducts(0)
    toast.success('Logout successfully')
    navigate('/')
  }


  return (
    <div className='header' ref={headerRef}>
      <div className="container">
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
              <Link to={"/cart"} className={userInfo ? `header__menu__cart` : `header__menu__cart__disabled`} value={totalProducts}>
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
                {userInfo?<div className="header__menu__item__user">
                  <img src={product_12_image_01} alt="" className='header__menu__item__user-image'/>
                  <div className='header__menu__item__user-username'>  
                    <div>{userInfo.email}</div>
                  </div>
                </div>:  <i className="bx bx-user"></i> }
              </Link>
              {userInfo?
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