import { configureStore } from "@reduxjs/toolkit";
import TemaSlice from '../features/Temas/tema_slice'
export const store = configureStore({
    reducer:{
        tema: TemaSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;