import React ,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import productData from '../assets/fake-data/products.js'
import numberWithCommas from '../changeNum/numberWithCommas.js'


import Title from '../components/Title.jsx'
import Button from '../components/Button.jsx'
import CartItem from '../components/CartItem.jsx'
import { getItemUser } from '../redux/shopping-cart/cartItemSlice.js'

const Cart = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartItems.value)

  const [cartProducts,setCartProducts] = useState([])

  const [totalProducts,setTotalProducts] = useState(0)

  const [totalPrice,setTotalPrice] = useState(0)

  useEffect(() => {
    dispatch(getItemUser())
  }, [])

  useEffect(() => {
    if(cartItems){
      setCartProducts(productData.getCartItemsInfo(cartItems));
      // setCartProducts(productData.getProductBySearch('Áo'))
      setTotalProducts(cartItems.reduce((total,item)=>total + Number(item.quantity),0));
      setTotalPrice(cartItems.reduce((total,item)=>total + (Number(item.quantity)*Number(item.price)),0))
    }
  }, [cartItems])
  
  return (
    <Title title='Giỏ hàng <3'>
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>
              Tổng số sản phẩm : <span>{totalProducts}</span>
            </p>
            <div className="cart__info__txt__price">
              <span>Thành tiền :</span>
              <span> {numberWithCommas(totalPrice)}</span>
            </div>
          </div>

          <div className="cart__info__button">
            <Button size='block' >Đặt hàng</Button>
            <Button size='block'  onclickMode={()=>navigate('/catalog')}>Tiếp tục mua hàng</Button>
          </div>

        </div>

        <div className="cart__list">
          {
            cartProducts.map((item,index)=>(
              <CartItem key={index} item={item}/>
            ))
          }
        </div>
      </div>
    </Title>
  )
}

export default Cart