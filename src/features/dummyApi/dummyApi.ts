import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDummyData  = createAsyncThunk(
    "dummy/fetchDummyData",
    async ()=>{
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
        return res.data;
    }
);
interface DummyState {
    data: any[];
    loading: boolean;
    error: string | null;
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