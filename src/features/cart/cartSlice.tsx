import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface CartItem{
    id:number;
    title:string;
    image:string;
    price:number;
    quantity:number;
};
interface CartState{
    items:CartItem[];
}

const initialState:CartState ={
    items:[]
}
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<CartItem>)=>{
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing){
                existing.quantity +=1;
            }else{
                state.items.push({...action.payload,quantity : 1})
            }

        },
        removeFromCart :(state, action:PayloadAction<number>)=>{
            state.items = state.items.filter(item =>item.id !== action.payload)
        },
        updateQuantity:(state, action: PayloadAction<{id:number; quantity:number}>)=>{
            const item = state.items.find(item =>item.id ===action.payload.id);
            if(item){
                item.quantity = action.payload.quantity;
            }
        },
        emptyCart:(state)=>{
            state.items=[];
        }

       
    }
});
export const {addToCart, removeFromCart, updateQuantity,emptyCart} = cartSlice.actions;
export default cartSlice.reducer;