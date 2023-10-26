import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const items = null

const initialState = {value:items};

export const cartItemsSlice = createSlice({

    name : 'cartItems',
    initialState,
    reducers: {
        addItem: (state,action) =>{
            const newItem = action.payload;
            const sessionToken = JSON.parse(localStorage.getItem('userInfo'))
            const itemInCart = JSON.parse(localStorage.getItem(`itemCart-${sessionToken?.email}`))
            if (!sessionToken) {
                toast.error('Please login !!!')
                return
            }
            if(!itemInCart){
                state.value = new Array({...action.payload,id:1});
                const initArr = new Array({...action.payload,id:1});
                localStorage.setItem(`itemCart-${sessionToken.email}`,JSON.stringify(initArr))
                toast.success('Added to cart')
            }else{
                state.value = itemInCart
                const duplicate = findItem(state.value,newItem)
                if(duplicate.length>0) {
                    state.value = deleteItem(state.value,newItem)
                    state.value = [...state.value,{
                        ...newItem,
                        id: duplicate[0].id,
                        quantity: newItem.quantity + duplicate[0].quantity
                    }]
                }else{
                    state.value = [...state.value,{
                        ...newItem,
                        id: state.value.length > 0 ? state.value[state.value.length - 1].id +1 : 1
                    }]
                }
                localStorage.setItem(`itemCart-${sessionToken.email}`,JSON.stringify(sortItems(state.value)))
                toast.success('Added to cart')
            }
        },

        updateItem: (state,action)=>{
            const sessionToken = JSON.parse(localStorage.getItem('userInfo'))
            const itemUpdate = action.payload;
            const item = findItem(state.value,itemUpdate)
            if (!sessionToken) {
                toast.error('Please login !!!')
                return
            }
            if(item.length>0){
                state.value = deleteItem(state.value,itemUpdate);
                state.value = [...state.value,{
                    ...itemUpdate,
                    id: item[0].id,
                }]
            }
            localStorage.setItem(`itemCart-${sessionToken.email}`,JSON.stringify(sortItems(state.value)))
        },
        delItem: (state,action)=>{
            const sessionToken = JSON.parse(localStorage.getItem('userInfo'))
            if (!sessionToken) {
                toast.error('Please login !!!')
                return
            }
            const item = action.payload;
            state.value = deleteItem(state.value,item)
            localStorage.setItem(`itemCart-${sessionToken.email}`,JSON.stringify(sortItems(state.value)))
        },
        getItemUser:(state,action)=>{
            const sessionToken = JSON.parse(localStorage.getItem('userInfo'))
            const isItemCart = localStorage.getItem(`itemCart-${sessionToken.email}`)
            if(isItemCart){
                state.value = JSON.parse(localStorage.getItem(`itemCart-${sessionToken.email}`))
            }else {
                state.value = null
            }
        },
        refreshCart:(state)=>{
            state.value = null;
        }
    }
})


const findItem = (arr,item) => arr.filter(
    e=>e.slug === item.slug &&
    e.color === item.color &&
    e.size === item.size
)

const deleteItem = (arr,item) => arr.filter(
    e=>e.slug !== item.slug ||
    e.color !== item.color ||
    e.size !== item.size
)

const sortItems = arr => arr.sort((a, b) => a.id - b.id)

export const { addItem ,updateItem , delItem ,getItemUser,refreshCart } = cartItemsSlice.actions
export default cartItemsSlice.reducer