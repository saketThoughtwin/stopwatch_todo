import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id:number,
  title:string,
  price:number,
  description:string,
  category:string,
  image:string,
  rating:{
    rate:number,
    count:number
  },
  }
export const fetchDummyData = createAsyncThunk<Product[]>(
    "dummy/fetchDummyData", async ()=>{
        const res = await axios.get("https://fakestoreapi.com/products");
        return res.data;

    }
);

interface DummyState {
    data:Product[];
    loading:boolean;
    error:string | null;
    
}

const initialState :DummyState ={
    data:[],
    loading:false,
    error:null,
}
const dummySlice = createSlice({
    name:"dummy",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchDummyData.pending,(state)=>{
            state.loading= true;
            state.error = null;
        })
        .addCase(fetchDummyData.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchDummyData.rejected,(state,action)=>{
            state.loading=false;
            state.error= action.error.message ||"Something Went Wrong";
        });
    },
});
export default dummySlice.reducer;