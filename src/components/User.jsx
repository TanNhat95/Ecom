import React, { useRef, useState ,useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation , useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import { useLoginMutation, useRegisterFncMutation } from '../redux/slices/usersApiSlice.js';
import { setCredentials } from '../redux/slices/authSlice.js';
import { getItemUser } from '../redux/shopping-cart/cartItemSlice.js'

import Button from './Button.jsx';


const User = props => {
    const  myState  = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[invalid,setInvalid] = useState(false);
    const[registerShow,setRegisterShow] = useState(false);
    const userRef = useRef();
    const userForm = useRef();
    const userFormRegister = useRef();
    const { register, formState: { errors, isSubmitting, isValid }, handleSubmit ,clearErrors ,reset } = useForm();

    const [login, {isLoading, error}] = useLoginMutation()
    const [registerFnc ] = useRegisterFncMutation()

    const { userInfo } = useSelector((state) => state.auth)

    // useEffect(() => {
    //     if (userInfo) {
    //         navigate('/')
    //     }
    // }, [navigate, userInfo])

    const onSubmit = async (data) => {
        try {
            if(registerShow) {
                const res = await registerFnc({email: data.email, password: data.password})
                dispatch(setCredentials({...res}))
                toast.success('Register successfully')
                userForm.current.reset();
                navigate('/')
            } else {
                const res = await login({email: data.emailLogin, password: data.passwordLogin}).unwrap()
                dispatch(setCredentials({...res}))
                dispatch(getItemUser())
                toast.success('Login successfully')
                userForm.current.reset();
                navigate('/')
            }
        } catch (error) {
            toast.error(error?.data?.message || error.error)
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
    <div className={`product-view__modal ${myState.state ?'active':''}`} ref={userRef}>
        {!registerShow&&<div className="product-view__modal__content user-view">
            <Button size='sm' onclickMode={handleActive}>Đóng</Button>
            <div className="auth-form">
                <div className="auth-form__header">
                    <h3 className="auth-form__header__heading">
                        Đăng nhập
                    </h3>
                    <span className="auth-form__header__switch" onClick={()=>setRegisterShow(true)
                    }>
                        Đăng kí
                    </span>
                </div>

                    <form className='auth-form__form' action="#" onSubmit={handleSubmit(onSubmit)} ref={userForm}>
                        <div className="auth-form__group">
                            <label htmlFor="email">Email: </label>
                            <input type="text" name='email' id='email' className="auth-form__group__input" placeholder='Email của bạn' autoComplete='off'
                                {...register("emailLogin", { 
                                    required: true ,
                                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i
                                    })
                                }
                            />
                        </div>

                        <div className="auth-form__group">
                            <label htmlFor="password">Password: </label>
                            <input type="password" name='password' id='password' className="auth-form__group__input" placeholder='Mật khẩu của bạn'
                            {...register("passwordLogin", { required: true })}
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
                                {errors.emailLogin?.type==='required'&&<li>Vui lòng nhập Email</li>}
                                {errors.emailLogin?.type==='pattern'&&<li>Vui lòng nhập đúng định dạng Email vd: abc@gmail.com</li>}
                                {errors.passwordLogin?.type==='required'&&<li>Vui lòng nhập mật khẩu</li>}
                                {invalid&&<li>Sai email hoặc mật khẩu</li>}
                            </ul>
                        )}

                        <div className="auth-form__group">
                            <Button type='submit' disabled={isSubmitting}>Login</Button>
                        </div>
                    </form>
            </div>
        </div>}

        {registerShow&&<div className="product-view__modal__content user-view">
            <Button size='sm' onclickMode={handleActive}>Đóng</Button>
            <div className="auth-form">
                <div className="auth-form__header">
                    <h3 className="auth-form__header__heading">
                        Đăng kí
                    </h3>
                    <span className="auth-form__header__switch" onClick={()=>setRegisterShow(false)}>
                        Đăng nhập
                    </span>
                </div>

                    <form className='auth-form__form' action="#" onSubmit={handleSubmit(onSubmit)} ref={userFormRegister}>
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
                            {...register("password", { required: true, minLength: 6 })}
                            />
                        </div>
                        {/* <div className="auth-form__group">
                            <div className="auth-form__group__remember">
                                <input type="checkbox"/> Ghi nhớ
                            </div>
                            <div className="auth-form__group__forget">
                                <Link to={'/'}>
                                    Quên mật khẩu
                                </Link>
                            </div>
                        </div> */}
                        {isError&&(
                            <ul className="error-container">
                                {errors.email?.type==='required'&&<li>Vui lòng nhập Email</li>}
                                {errors.email?.type==='pattern'&&<li>Vui lòng nhập đúng định dạng Email vd: abc@gmail.com</li>}
                                {errors.password?.type==='required'&&<li>Vui lòng nhập mật khẩu</li>}
                                {errors.password?.type==='minLength'&&<li>Vui lòng nhập tối đa mật khẩu 6 kí tự</li>}
                                {invalid&&<li>Sai email hoặc mật khẩu</li>}
                            </ul>
                        )}

                        <div className="auth-form__group">
                            <Button type='submit' disabled={isSubmitting}>Register</Button>
                        </div>
                    </form>
            </div>
        </div>}


    </div>
  )
}

User.propTypes = {

}

export default User
