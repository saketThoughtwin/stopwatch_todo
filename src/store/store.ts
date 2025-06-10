import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todos/todoSlice";
import dummyReducer from "../features/dummyApi/dummyApi"
import cartReducer from "../features/cart/cartSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: "cart",
    storage,
  };
  const persistedCartReducer = persistReducer(persistConfig, cartReducer);
export const store = configureStore({
    reducer:{
        todos:todoReducer,
        dummy:dummyReducer,
        cart:persistedCartReducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck: {
              // Ignore redux-persist actions for serializable check
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
          }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;