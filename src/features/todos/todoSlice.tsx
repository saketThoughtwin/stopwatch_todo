import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
interface Todo{
    id:number,
    text:string,
    completed:boolean
}
interface TodoState{
    todos:Todo[]
}
const initialState: TodoState ={
    todos:[]
};
const todoSlice = createSlice({
    name :'todo',
    initialState,
    reducers:{
        addTodo :(state,action:PayloadAction<string>)=>{
            const newTodo:Todo ={
                id:Date.now(),
                text:action.payload,
                completed:false
            };
            state.todos.push(newTodo);
        },
        toggleTodo:(state, action:PayloadAction<number>)=>{
            const todo = state.todos.find((t)=>t.id === action.payload);
            if(todo){
                todo.completed = !todo.completed;
            }
        },
        deleteTodo:(state, action:PayloadAction<number>)=>{
            state.todos = state.todos.filter((t)=>t.id !== action.payload);
        },
        editTodo:(state, action:PayloadAction<{id:number; text:string}>)=>{
            const todo = state.todos.find((t)=>t.id ===action.payload.id);
            if(todo){
                todo.text = action.payload.text;
            }
            
        }
    },
});
export const {addTodo, toggleTodo, deleteTodo, editTodo} = todoSlice.actions;
export default todoSlice.reducer;