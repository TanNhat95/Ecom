import React, { useRef, useState ,useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation , useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'

import Button from './Button.jsx';
import { getItemUser } from '../redux/shopping-cart/cartItemSlice.js';
import {loginFail} from '../redux/authen/userSlice.js'
import  {loginUser,registerUser}  from '../redux/apiRequest.js';

const User = props => {
    
    const  myState  = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
//     const users =[
//     {
//         email: 'admin@gmail.com',
//         password: '123456',
//         sessionToken: 'cartItems'
//     },
//     {
//         email: 'user@gmail.com',
//         password: '123456',
//         sessionToken: 'cartItems2'
//     }
// ] 
    const[invalid,setInvalid] = useState(false);
    const[registerShow,setRegisterShow] = useState(false);
    const userRef = useRef();
    const userForm = useRef();
    const userFormRegister = useRef();
    const { register, formState: { errors }, handleSubmit ,clearErrors ,reset } = useForm();
    const error =   useSelector((state)=>state.authen.login.error);
    const user = useSelector(state=>state.authen.login.currentUser);
    

    useEffect(() => {
       if(error)
            {
                setInvalid(true);
            }else{
                setInvalid(false);
                userForm.current.reset();
                reset();
            }
    }, [error])

    const onSubmit = (data) => {
        const userLogin = {
            username: data.emailLogin,
            password: data.passwordLogin,
        }

        const newUser = {
            username: data.email,
            password: data.password
        };
        if(!registerShow){
            loginUser(userLogin,dispatch,navigate);             
        }else{
            console.log(newUser)
            registerUser(newUser,dispatch,navigate);
            userFormRegister.current.reset();
            setRegisterShow(!registerShow);
        }

        // if(data!==undefined){
        //     const match = users.filter(e=>e&&e.email===data.email&&e.password===data.password)
        //     if(match.length!==0){
        //         setInvalid(false);
        //         dispatch(getItemUser(match[0]));
        //         userRef.current.classList.remove('active');
        //         userForm.current.reset();
        //         myState.state=''
        //         navigate(`/${window.location.href.split('/').pop()}`)
        //         reset();
        //     }
        //     if(match.length===0){
        //         setInvalid(true)
        //     }
        // }else{
        //     setInvalid(true);
        // }
        
    }
    const handleActive = () => {
        clearErrors('email');
        clearErrors('password')
        userRef.current.classList.remove('active');
        setInvalid(false)
        navigate(`/${window.location.href.split('/').pop()}`)
        // userForm.current.reset();
        reset();
    }
    const isError = Object.keys(errors).length!==0||invalid;
    useEffect(() => {
        dispatch(getItemUser(user?.username));
        navigate(`/${window.location.href.split('/').pop()}`);
    }, [user])
    
  return (
    <div className={`product-view__modal ${myState.state?'active':''}`} ref={userRef}>
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
                        {
                            true||true&&(<div>Nhất nè</div>)
                        }

                        <div className="auth-form__group">
                            <Button type='submit'>Login</Button>
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
                            {...register("password", { required: true })}
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
                        {/* {isError&&(
                            <ul className="error-container">
                                {errors.email?.type==='required'&&<li>Vui lòng nhập Email</li>}
                                {errors.email?.type==='pattern'&&<li>Vui lòng nhập đúng định dạng Email vd: abc@gmail.com</li>}
                                {errors.password?.type==='required'&&<li>Vui lòng nhập mật khẩu</li>}
                                {invalid&&<li>Sai email hoặc mật khẩu</li>}
                            </ul>
                        )}
                        {
                            true||true&&(<div>Nhất nè</div>)
                        } */}

                        <div className="auth-form__group">
                            <Button type='submit' >Register</Button>
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
