import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('itemCart') ? JSON.parse(localStorage.getItem('itemCart')) : null
}

const cartSlice = createSlice({
    name: 'itemCart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem('itemCart', JSON.stringify(action.payload))
        },
        removeCart: (state, action) => {
            state.userInfo = null
            localStorage.removeItem('itemCart')
        }
    }
})

export const { addToCart, removeCart } = cartSlice.actions

export default cartSlice.reducer