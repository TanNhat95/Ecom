import { createSlice } from "@reduxjs/toolkit";

localStorage.setItem('login',null)
const sessionToken = JSON.parse(localStorage.getItem('login'));
const items = localStorage.getItem(sessionToken) !==null ? 
    JSON.parse(localStorage.getItem(sessionToken)) : [];


const initialState = {value:items};

export const cartItemsSlice = createSlice({
    name : 'cartItems', 
    initialState,
    reducers: {
        addItem: (state,action) =>{
            const newItem = action.payload
            const duplicate = findItem(state.value,newItem)
            const sessionToken = JSON.parse(localStorage.getItem('login'))
            if(sessionToken){
                if(duplicate.length>0) {
                    state.value = deleteItem(state.value,newItem)
                    
    
                    state.value = [...state.value,{
                        ...newItem,
                        id: duplicate[0].id,
                        quantity: newItem.quantity + duplicate[0].quantity
                    }]
                console.log(`quantity dup : ${duplicate[0].quantity} ,quantity new :  ${newItem.quantity}`)
    
                }else{    
                    state.value = [...state.value,{
                        ...newItem,
                        id: state.value.length > 0 ? state.value[state.value.length - 1].id + 1 : 1
                    }]
                }
                localStorage.setItem(sessionToken,JSON.stringify(sortItems(state.value)))
            }  
        },

        updateItem: (state,action)=>{
            const itemUpdate = action.payload;
            const item = findItem(state.value,itemUpdate)
            const sessionToken = JSON.parse(localStorage.getItem('login'))
            if(sessionToken){
                if(item.length>0){
                    state.value = deleteItem(state.value,itemUpdate);
                    state.value = [...state.value,{
                        ...itemUpdate,
                        id: item[0].id,
                    }]
    
                }
                localStorage.setItem(sessionToken,JSON.stringify(sortItems(state.value)))
            }  
        },
        delItem: (state,action)=>{
            const item = action.payload;
            const sessionToken = JSON.parse(localStorage.getItem('login'));
            if(sessionToken){
                state.value = deleteItem(state.value,item)
                localStorage.setItem(sessionToken,JSON.stringify(sortItems(state.value)))
            }  
        },
        getItemUser:(state,action)=>{
            /** register */
            const {email,sessionToken} = action.payload;
            const tokens = [];
            let newTokens=[];
            if(localStorage.getItem('listToken')){
                newTokens = JSON.parse(localStorage.getItem('listToken'));
            }
            localStorage.setItem('listToken',JSON.stringify(tokens))
            for (var i = 0; i < localStorage.length; i++) {
                if(localStorage.key(i)==='listToken'){
                    if(JSON.parse(localStorage.getItem('listToken'))[0]===undefined){
                        localStorage.setItem('listToken',JSON.stringify([sessionToken]))   
                    }
                    if(newTokens.length!==0){
                        if(!newTokens.includes(sessionToken))
                            newTokens.push(sessionToken);
                    }
                    if(newTokens.length===0){
                        newTokens.push(sessionToken);
                    }
                    localStorage.setItem('listToken',JSON.stringify(newTokens))
                }
              }
              /**end register */

              /**login */

              localStorage.setItem('login',JSON.stringify(sessionToken))
              state.value = JSON.parse(localStorage.getItem(sessionToken))
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

export const { addItem ,updateItem , delItem ,getItemUser } = cartItemsSlice.actions
export default cartItemsSlice.reducer