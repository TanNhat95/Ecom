import React, { useRef, useState , useEffect } from 'react'
import ProductViews from './ProductViews.jsx'
import productData from '../assets/fake-data/products.js'
import Button from './Button.jsx'
import { useSelector , useDispatch } from 'react-redux'
import { remove } from '../redux/productModal/productModalSlice.js'

const ProductViewModal = () => {

    const productSlug = useSelector((state)=>state.productModal.value) ;
    const dispatch = useDispatch();
    const [product,setProduct] = useState(undefined);

    // const product = productData.getProductBySlug('quan-jean-phong-cach-18');

    useEffect(() => {
        setProduct(productData.getProductBySlug(productSlug)) 
    }, [productSlug])
    

    const modalRef = useRef();
    // const closeModal = () => modalRef.current.classList.remove('active')
  return (
    <div className={`product-view__modal ${product!==undefined ? 'active' :''}`} ref={modalRef}>
        <div className="product-view__modal__content">
            <ProductViews product={product} />
            <div className="product-view__modal__content__close">
                <Button
                    size='sm'
                    onclickMode={()=>dispatch(remove())}
                >
                    Đóng
                </Button>
            </div>
        </div>
    </div>
  )
}

export default ProductViewModal