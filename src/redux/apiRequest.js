import axios from 'axios';
import { loginFail, loginStart,loginSuccess, registerFail, registerStart, registerSuccess } from './authen/userSlice';

export const loginUser = async(user,dispatch,navigate) =>{
    dispatch(loginStart());
    try {
        const res = await axios.post("/user95",user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (error) {
        dispatch(loginFail());
    }
}

export const registerUser = async (user,dispatch,navigate) =>{
    dispatch(registerStart());
    try {
        const res = await axios.post("/register",user);
        dispatch(registerSuccess(res.data));
        navigate("/")
    } catch (err) {
        dispatch(registerFail());
    }
}