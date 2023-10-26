import React ,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { updateItem , delItem } from '../redux/shopping-cart/cartItemSlice'

import numberWithCommas from '../changeNum/numberWithCommas'


const CartItem = props => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [item,setItem] = useState(props.item);
    const [quantity,setQuantity] = useState(props.item.quantity);


    useEffect(() => {
      setItem(props.item);
      setQuantity(props.item.quantity);
    }, [props.item])

    const updateQuantity = options =>{
        if(options=== '+'){
            dispatch(updateItem({...item,quantity:quantity+1}))
        }
        if(options=== '-'){
            dispatch(updateItem({...item,quantity:quantity-1===0 ? 1 : quantity-1}))
        }
    }
    const removeCartItem = () =>{
        dispatch(delItem(item))
    }
    return (
        <div className='cart__item'>
            <div className="cart__item__image" onClick={()=>navigate(`/catalog/${item.slug}`)}>
                <img src={item.product.image01} alt="" />
            </div>
            <div className="cart__item__info">
                <div className="cart__item__info__name">
                    <div className="cart__item__info__name-txt" onClick={()=>navigate(`/catalog/${item.slug}`)}>
                        {`${item.title} - ${item.color} - ${item.size}`}
                    </div>
                </div>
                <div className="cart__item__info__price">
                    {numberWithCommas(Number(item.price))}
                </div>
                <div className="cart__item__info__quantity">
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__button" onClick={()=>updateQuantity('-')}>
                            <i className="bx bx-minus"></i>
                        </div>

                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>

                        <div className="product__info__item__quantity__button" onClick={()=>updateQuantity('+')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>

                <div className="cart__item__info__delete" onClick={()=>removeCartItem()}>
                    <i className="bx bx-trash"></i>
                </div>
            </div>
        </div>
    )

}

CartItem.propTypes = {
    item : PropTypes.object
}

export default CartItem