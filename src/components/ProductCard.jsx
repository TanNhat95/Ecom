import React from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import numberWithCommas from '../changeNum/numberWithCommas.js'

import {useDispatch} from 'react-redux'
import {set} from '../redux/productModal/productModalSlice.js'
const ProductCard = props => {

    const dispatch = useDispatch();
  return (
    <div className="product-card">
        <Link to={`/catalog/${props.slug}`}>
            <div className="product-card__image">
                <img src={props.img01}alt="" />
                <img src={props.img02}alt="" />
            </div>
            <h3 className="product-card__name">{props.name}</h3>
            <div className="product-card__price">
                {numberWithCommas(props.price)}
                <span className="product-card__price-old">
                    <del>{numberWithCommas("399999")}</del>
                </span>
            </div>       
        </Link>
        <div className="product-card__button">
                <Button
                    size="sm"
                    icon="bx bx-cart"
                    animate={true}
                    onclickMode={()=>dispatch(set(props.slug))}
                >
                    Mua ngay
                </Button>
        </div>
    </div>
  )
}

ProductCard.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

export default ProductCard