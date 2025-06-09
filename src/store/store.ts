import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todos/todoSlice";
import dummyReducer from "../features/dummyApi/dummyApi"
export const store = configureStore({
    reducer:{
        todos:todoReducer,
        dummy:dummyReducer,
    },

});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;