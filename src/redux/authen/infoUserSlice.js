import { createSlice } from "@reduxjs/toolkit";

const infoUserSlice = createSlice({
    name: "user",
    initialState:{
        users:{
            allUser:null,
            isFetching:false,
            error:false
        },
    },
    reducers:{
        getUsersStart: state =>{
            state.users.isFetching =true;
        },
        getUsersSuccess: (state,action) =>{
            state.users.isFetching = false;
            state.users.error = false;
            state.users.allUser = action.payload;
        },
        getUsersFail: state=> {
            state.users.isFetching = false;
            state.users.error = false;
            state.users.allUser = null
        }
    }
})

export const {
    getUsersFail,
    getUsersStart,
    getUsersSuccess,
} = infoUserSlice.actions;

export default infoUserSlice.reducer;