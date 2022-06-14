import React, { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch ,useSelector } from 'react-redux'

import { addItem } from '../redux/shopping-cart/cartItemSlice.js'
import PropTypes from 'prop-types'
import Button from './Button.jsx'

import numberWithCommas from '../changeNum/numberWithCommas.js'
const ProductViews = props => {

    const dispatch = useDispatch();

    let product = props.product
    if(product===undefined){
        product = {
            price:0,
            title:'',
            colors:[],
            size:[]
        }
    } 

    const [previewImg,setPreviewImg] = useState(product.image01)
    const [descriptionExpand,setDescriptionExpand] = useState(false)
    const [color,setColor] = useState(undefined);
    const [size,setSize] = useState(undefined);
    const [quantity,setQuantity] = useState(1);
    const [infoUser,setInfoUser] = useState(undefined);
    const user = useSelector(state=>state.authen.login?.currentUser);

    const minusQuantiy = () => {
        if(quantity!==1)
        setQuantity(quantity-1)
    }
    const plusQuantiy = () => {
        setQuantity(quantity+1)
    }

    const toggleExpand = () => {
        setDescriptionExpand(!descriptionExpand)
    }

    useEffect(() => {
        setColor(undefined);
        setSize(undefined);
        setQuantity(1);
        setPreviewImg(product.image01);
    }, [product])

    useEffect(() => {
        setInfoUser(user)
    }, [user])
    
    
    const checkCart = () => {
        if(color===undefined){
            alert('Vui lòng chọn màu');
            return false
        }
        if(size===undefined){
            alert('Vui lòng chọn size');
            return false
        }
        return true;
    }
    const navigate = useNavigate();

    const addToCart = () => {
        if(checkCart()){
            dispatch(addItem({
                price: product.price,
                color: color,
                size : size,
                quantity: quantity,
                slug : product.slug,
                title: product.title,
                user : infoUser,
            },))
            alert('Đã thêm vào giỏ hàng')
        }
        
    }

    const goToCart = () => {
        if(checkCart()) navigate('/cart')
    }
  return (
    <div className='product'>
        <div className="product__images">
          <div className="product__images__list">
              <div className="product__images__list-item" onClick={()=>setPreviewImg(product.image01)}>
                  <img src={product.image01} alt="" />
              </div>
              <div className="product__images__list-item" onClick={()=>setPreviewImg(product.image02)}>
                  <img src={product.image02} alt="" />
              </div>
          </div>

          <div className="product__images__main">
              <img src={previewImg} alt="" />
          </div>

        <div className={`product__description ${descriptionExpand ? 'expand' : ''}`}>
          <div className="product__description__title">
              Mô tả sản phẩm
          </div>
          <div className="product__description__content" dangerouslySetInnerHTML={{__html:product.description}}>
              
          </div>
          <div className="product__description__content-toggle">
              <Button size='sm' onclickMode={toggleExpand}>{
                  descriptionExpand ? 'Thu gọn' : 'Xem thêm'
              }</Button>
          </div>
        </div>
        </div>  
        <div className="product__info">
            <h1 className="product__info__title">
                {product.title}
            </h1>

            <div className="product__info__item">
                <span className="product__info__item-price">
                    {numberWithCommas(product.price)}
                </span>
            </div>

            <div className="product__info__item">
                <div className="product__info__item__title">
                    Màu sắc
                </div>
                <div className="product__info__item__list">
                    {
                        product.colors.map((item,index)=>(
                            <div key={index} className={`product__info__item__list-item ${color===item ? 'active' : ''}`} onClick={()=>setColor(item)}>
                                <div className={`circle bg-${item}`}></div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="product__info__item">
                <div className="product__info__item__title">
                    Kích cỡ
                </div>
                <div className="product__info__item__list">
                    {
                        product.size.map((item,index)=>(
                            <div key={index} className={`product__info__item__list-item ${size===item ? 'active' : ''}`} onClick={()=>setSize(item)}>
                                <span className="product__info__item__list-item-size">
                                    {item}
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="product__info__item">
                <div className="product__info__item__title">
                    Số lượng
                </div>
                <div className="product__info__item__quantity">
                    <div className="product__info__item__quantity__button" onClick={()=>minusQuantiy()}>
                        <i className="bx bx-minus"></i>
                    </div>

                    <div className="product__info__item__quantity__input">
                        {quantity}
                    </div>

                    <div className="product__info__item__quantity__button" onClick={()=>plusQuantiy()}>
                        <i className="bx bx-plus"></i>
                    </div>
                </div>
            </div>

            <div className="product__info__item">
                <Button onclickMode={addToCart}>Thêm vào giỏ</Button>
                <Button onclickMode={goToCart}>Mua ngay</Button>
            </div>

           
        </div>

         {/* description for mobile */}

         <div className={`product__description mobile ${descriptionExpand ? 'expand' : ''}`}>
          <div className="product__description__title">
              Mô tả sản phẩm
          </div>
          <div className="product__description__content" dangerouslySetInnerHTML={{__html:product.description}}>
              
          </div>
          <div className="product__description__content-toggle">
              <Button size='sm' onclickMode={toggleExpand}>{
                  descriptionExpand ? 'Thu gọn' : 'Xem thêm'
              }</Button>
          </div>
        </div>

    </div>
  )
}

ProductViews.propTypes = {
    product: PropTypes.object
}

export default ProductViews
