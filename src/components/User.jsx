import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation , useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'

import Button from './Button.jsx';
import { getItemUser } from '../redux/shopping-cart/cartItemSlice.js'

const User = props => {
    
    const  myState  = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users =[
    {
        email: 'admin@gmail.com',
        password: '123456',
        sessionToken: 'cartItems'
    },
    {
        email: 'user@gmail.com',
        password: '123456',
        sessionToken: 'cartItems2'
    }
] 
    const[invalid,setInvalid] = useState(false)
    const userRef = useRef();
    const userForm = useRef();
    const { register, formState: { errors }, handleSubmit ,clearErrors ,reset } = useForm();

    const onSubmit = (data) => {
        if(data!==undefined){
            const match = users.filter(e=>e&&e.email===data.email&&e.password===data.password)
            if(match.length!==0){
                setInvalid(false);
                dispatch(getItemUser(match[0]));
                userRef.current.classList.remove('active');
                userForm.current.reset();
                myState.state=''
                navigate(`/${window.location.href.split('/').pop()}`)
                reset();
            }
            if(match.length===0){
                setInvalid(true)
            }
        }else{
            setInvalid(true);
        }
        
    }
    const handleActive = () => {
        clearErrors('email');
        clearErrors('password')
        userRef.current.classList.remove('active');
        setInvalid(false)
        navigate(`/${window.location.href.split('/').pop()}`)
        userForm.current.reset();
        reset();
    }
    const isError = Object.keys(errors).length!==0||invalid;

  return (
    <div className={`product-view__modal ${myState.state?'active':''}`} ref={userRef}>
        <div className="product-view__modal__content user-view">
            <Button size='sm' onclickMode={handleActive}>Đóng</Button>
            <div className="auth-form">
                <div className="auth-form__header">
                    <h3 className="auth-form__header__heading">
                        Đăng nhập
                    </h3>
                    <span className="auth-form__header__switch">
                        Đăng kí
                    </span>
                </div>

                    <form className='auth-form__form' action="#" onSubmit={handleSubmit(onSubmit)} ref={userForm}>
                        <div className="auth-form__group">
                            <label htmlFor="email">Email: </label>
                            <input type="text" name='email' id='email' className="auth-form__group__input" placeholder='Email của bạn' autoComplete='off'
                                {...register("email", { 
                                    required: true ,
                                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i
                                    })
                                }
                            />
                        </div>

                        <div className="auth-form__group">
                            <label htmlFor="password">Password: </label>
                            <input type="password" name='password' id='password' className="auth-form__group__input" placeholder='Mật khẩu của bạn'
                            {...register("password", { required: true })}
                            />
                        </div>
                        <div className="auth-form__group">
                            <div className="auth-form__group__remember">
                                <input type="checkbox"/> Ghi nhớ
                            </div>
                            <div className="auth-form__group__forget">
                                <Link to={'/'}>
                                    Quên mật khẩu
                                </Link> 
                            </div>
                        </div>
                        {isError&&(
                            <ul className="error-container">
                                {errors.email?.type==='required'&&<li>Vui lòng nhập Email</li>}
                                {errors.email?.type==='pattern'&&<li>Vui lòng nhập đúng định dạng Email vd: abc@gmail.com</li>}
                                {errors.password?.type==='required'&&<li>Vui lòng nhập mật khẩu</li>}
                                {invalid&&<li>Sai email hoặc mật khẩu</li>}
                            </ul>
                        )}
                        {
                            true||true&&(<div>Nhất nè</div>)
                        }

                        <div className="auth-form__group">
                            <Button type='submit'>Login</Button>
                        </div>
                    </form>
            </div>
        </div>
    </div>
  )
}

User.propTypes = {

}

export default User
